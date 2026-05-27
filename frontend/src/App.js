import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { fetchMenu, placeOrder } from './services/api';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  // Fetch menu from backend
  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const data = await fetchMenu();
      setMenuItems(data);
    } catch (error) {
      console.error('Error loading menu:', error);
      showToast('Failed to load menu. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(message);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (name, price) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === name);
      if (existingItem) {
        showToast(`${name} quantity: ${existingItem.quantity + 1}`);
        return prevCart.map(item =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        showToast(`${name} added to cart`);
        return [...prevCart, { name, price, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (name) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === name);
      if (existingItem.quantity > 1) {
        showToast(`${name} removed (${existingItem.quantity - 1} left)`);
        return prevCart.map(item =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        showToast(`${name} removed from cart`);
        return prevCart.filter(item => item.name !== name);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared successfully');
  };

  const placeOrderHandler = async () => {
    if (cart.length === 0) {
      showToast('Your cart is empty!');
      return;
    }

    const orderData = {
      items: cart,
      totalAmount: getCartTotal(),
      status: 'pending'
    };

    try {
      await placeOrder(orderData);
      showToast('Order placed successfully');
      setCart([]);
    } catch (error) {
      console.error('Error placing order:', error);
      showToast('Failed to place order. Please try again.');
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading delicious Egyptian cuisine...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Menu menuItems={menuItems} addToCart={addToCart} />
      <Cart 
        cart={cart} 
        removeFromCart={removeFromCart} 
        clearCart={clearCart}
        total={getCartTotal()}
        placeOrder={placeOrderHandler}
      />
      <Gallery />
      <About />
      <Contact showToast={showToast} />
      <Footer />
      {toast && <Toast message={toast} onComplete={() => setToast(null)} />}
    </div>
  );
}

export default App;