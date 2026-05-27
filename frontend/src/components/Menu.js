import React from 'react';

const Menu = ({ menuItems, addToCart }) => {
  return (
    <section id="menu">
      <div className="container">
        <h2 className="section-title">Our Menu</h2>
        <p className="section-text">Enjoy traditional Egyptian dishes made with rich flavors, fresh ingredients, and recipes inspired by locals.</p>
        <div className="menu-grid">
          {menuItems.map(item => (
            <div key={item._id} className="menu-card">
              <h3>{item.name}</h3>
              <span className="price">${item.price} USD</span>
              <p>{item.description}</p>
              <button onClick={() => addToCart(item.name, item.price)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;