import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Checkout.css';

const Checkout = ({ cartItems = [],clearCart  }) => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [address, setAddress] = useState({
    hno: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    mobile: '',
  });
  const navigate = useNavigate();


  const parsePrice = (price) => parseInt(price.toString().replace(/[₹,]/g, ''));

  const total = cartItems.reduce((acc, item) => acc + parsePrice(item.price) * item.qty, 0);
  const tax = total * 0.05;
  const grandTotal = total + tax;

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handlePayNow = async () => {
    const isAnyFieldEmpty = Object.values(address).some(value => value.trim() === '');
    if (isAnyFieldEmpty) {
      alert('Please fill all the address fields before proceeding with payment.');
      return;
    }
  
    const orderData = {
      address,
      paymentMethod,
      cartItems,
      total,
      tax,
      grandTotal,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        clearCart();
        navigate('/PaymentSuccess');
      } else {
        alert(result.message || 'Order failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong while placing the order.');
    }
  };
  

  return (
    <>
      <div style={{ backgroundColor: '#E3BE84', color: 'white', fontSize: '40px', padding: '15px' }}>
        Billing address
      </div>
      <div style={{height:'600px', padding:''}}>
      <div className="checkout-container">
        <div className="checkout-left">
          <div className="billing-address">
            <h3  style={{height:'40px'}}>Billing Address</h3>
            <div className="address-card">

              <input
                type="text"
                name="hno"
                value={address.hno}
                onChange={handleAddressChange}
                placeholder="House Number"
                className="input-field"
              />
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
                placeholder="Street"
                className="input-field"
              />
              <input
                type="text"
                name="landmark"
                value={address.landmark}
                onChange={handleAddressChange}
                placeholder="Landmark"
                className="input-field"
              />
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                placeholder="City"
                className="input-field"
              />
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                placeholder="State"
                className="input-field"
              />
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleAddressChange}
                placeholder="Country"
                className="input-field"
              />
              <input
                type="text"
                name="pinCode"
                value={address.pinCode}
                onChange={handleAddressChange}
                placeholder="Pin Code"
                className="input-field"
              />
              <input
                type="text"
                name="mobile"
                value={address.mobile}
                onChange={handleAddressChange}
                placeholder="Mobile Number"
                className="input-field"
              />
            </div>
          </div>

          <div className="payment-details">
            <h3  style={{height:'40px'}}>Payment Details</h3>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={handlePaymentChange}
              />
              Cash on Delivery
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={handlePaymentChange}
              />
              Credit Card Payment
            </label>
          </div>
        </div>

        <div className="checkout-right">
          <div className="cart-summary">
            <h3  style={{height:'40px'}}>Your Cart</h3>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.img} alt={item.cat} />
                <div className="item-details">
                  <p>{item.cat}</p>
                  <p>₹{parsePrice(item.price).toLocaleString()}</p>
                  <p>Qty: {item.qty}</p>
                </div>
              </div>
            ))}
            <div className="price-summary">
              <p>Total: <strong>₹{total.toLocaleString()}</strong></p>
              <p>Tax: <strong>₹{tax.toFixed(2)}</strong></p>
              <p>Grand Total: <strong>₹{grandTotal.toLocaleString()}</strong></p>
            </div>
            {paymentMethod === 'card' ? (
  <CardPayment amount={grandTotal * 100} onSuccess={() => {
    clearCart();
    navigate('/payment-success');
  }} />
) : (
  <button className="pay-now-btn" onClick={handlePayNow}>
    Pay Now ₹{grandTotal.toFixed(2)}
  </button>
)}


          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Checkout;
