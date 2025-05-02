import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CgMathPlus } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";
import './Cart.css';

const Cart = ({ cartItems = [], onAddToCart, onRemoveFromCart, onDeleteItem }) => {
  
  const parsePrice = (price) => parseInt(price.toString().replace(/[₹,]/g, ''));
  
  const total = cartItems.reduce((acc, item) => acc + parsePrice(item.price) * item.qty, 0);
  const tax = total * 0.05;
  const grandTotal = total + tax;
  
  const navigate = useNavigate() 
  return (
    <>
      <div style={{ backgroundColor: '#E3BE84', color: 'white', fontSize: '40px', padding: '15px' }}>
        Your Cart
      </div>
      <div className="cart-wrapper">
        <div className="cart-left">
          <h2>Your Cart Items</h2>
          {cartItems.length === 0 ? (
            <p style={{ padding: '20px' }}>Your cart is empty.</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td><img src={item.img} alt={item.cat} className="cart-img" /></td>
                    <td>{item.cat}</td>
                    <td>
                      <button onClick={() => onRemoveFromCart(item)} style={{ marginRight: '8px',border:'none',textDecoration:'none',backgroundColor:"#E3BE84"}}><CgMathMinus /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => onAddToCart(item)} style={{ marginLeft: '8px',border:'none',textDecoration:'none',backgroundColor:"#E3BE84" }}><CgMathPlus /></button>
                    </td>
                    <td>₹{(parsePrice(item.price) * item.qty).toLocaleString()}</td>
                    <td>
                      <button className="delete-btn" onClick={() => onDeleteItem(item)}>DELETE</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="cart-right">
          <h2>Your Total</h2>
          <div className="total-card">
            <p>Total : <strong>₹{total.toLocaleString()}</strong></p>
            <p>Tax : <strong>₹{tax.toFixed(2)}</strong></p>
            <p>Grand Total : <strong>₹{grandTotal.toLocaleString()}</strong></p>
          </div>
          <div className="action-buttons">
            <button
              className="checkout-btn"
              onClick={() => {
                if (cartItems.length === 0) {
                  alert('Please add something to cart first!');
                } else {
                 navigate('/checkout')
                }
              }}
            >
              CHECKOUT
            </button>

            <Link to="/mens">
              <button className="shopmore-btn">SHOP MORE</button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Cart;
