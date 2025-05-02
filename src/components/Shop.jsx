// Shop.js
import React, { useState } from 'react';
import MensCollection from './MensCollection';
import Cart from './Cart';

const Shop = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.cat === product.cat);
      if (existingItem) {
        // Increase quantity if item already in cart
        return prevItems.map(item =>
          item.cat === product.cat ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, qty: 1 }];
      }
    });
  };

  return (
    <div>
      <MensCollection onAddToCart={handleAddToCart} />
      <Cart cartItems={cartItems} />
    </div>
  );
};

export default Shop;
