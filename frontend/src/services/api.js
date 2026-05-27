const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const fetchMenu = async () => {
  const response = await fetch(`${API_URL}/menu`);
  if (!response.ok) throw new Error('Failed to fetch menu');
  return response.json();
};

export const placeOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!response.ok) throw new Error('Failed to place order');
  return response.json();
};

export const fetchOrders = async () => {
  const response = await fetch(`${API_URL}/orders`);
  if (!response.ok) throw new Error('Failed to fetch orders');
  return response.json();
};