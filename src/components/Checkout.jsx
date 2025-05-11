import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cartItems = [], clearCart }) => {
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
  const [errors, setErrors] = useState({});
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

    // For mobile number, allow only numeric values
    if (name === 'mobile' && /[^0-9]/.test(value)) {
      return; // Don't allow non-numeric characters
    }

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const newErrors = { ...errors };

    // Validation for the field when it loses focus
    if (!address[name].trim()) {
      newErrors[name] = 'This field is required';
    } else {
      delete newErrors[name]; // Clear error when the field is valid
    }

    // Mobile number validation (10 digits)
    if (name === 'mobile' && !/^\d{10}$/.test(address[name])) {
      newErrors.mobile = 'Invalid mobile number';
    }

    setErrors(newErrors); // Update errors
  };

  const handlePayNow = async () => {
    const newErrors = {};
    for (const field in address) {
      if (!address[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // don't proceed
    }

    setErrors({}); // clear errors if all fields are valid

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        clearCart();
        navigate('/PaymentSuccess');
      } else {
        alert(result.message || 'Order failed. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong while placing the order.');
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#E3BE84', color: 'white', fontSize: '40px', padding: '15px' }}>
        Billing address
      </div>
      <div style={{ height: '600px', padding: '' }}>
        <div className="checkout-container">
          <div className="checkout-left">
            <div className="billing-address">
              <h3 style={{ height: '40px' }}>Billing Address</h3>
              <div className="address-card">
                <input
                  type="text"
                  name="hno"
                  value={address.hno}
                  onChange={handleAddressChange}
                  onBlur={handleBlur} // Added onBlur event
                  placeholder="House Number"
                  className={`input-field ${errors.hno ? 'input-error' : ''}`}
                />
                {errors.hno && <span className="error-message">{errors.hno}</span>}

                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  onBlur={handleBlur} // Added onBlur event
                  placeholder="Street"
                  className={`input-field ${errors.street ? 'input-error' : ''}`}
                />
                {errors.street && <span className="error-message">{errors.street}</span>}

                <input
                  type="text"
                  name="landmark"
                  value={address.landmark}
                  onChange={handleAddressChange}
                  onBlur={handleBlur} // Added onBlur event
                  placeholder="Landmark"
                  className={`input-field ${errors.landmark ? 'input-error' : ''}`}
                />
                {errors.landmark && <span className="error-message">{errors.landmark}</span>}

                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  onBlur={handleBlur} // Added onBlur event
                  placeholder="City"
                  className={`input-field ${errors.city ? 'input-error' : ''}`}
                />
                {errors.city && <span className="error-message">{errors.city}</span>}

                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                  onBlur={handleBlur} // Added onBlur event
                  placeholder="State"
                  className={`input-field ${errors.state ? 'input-error' : ''}`}
                />
                {errors.state && <span className="error-message">{errors.state}</span>}

                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleAddressChange}
                  onBlur={handleBlur} // Added onBlur event
                  placeholder="Country"
                  className={`input-field ${errors.country ? 'input-error' : ''}`}
                />
                {errors.country && <span className="error-message">{errors.country}</span>}

                <input
                  type="text"
                  name="pinCode"
                  value={address.pinCode}
                  onChange={handleAddressChange}
                  onBlur={handleBlur} // Added onBlur event
                  placeholder="Pin Code"
                  className={`input-field ${errors.pinCode ? 'input-error' : ''}`}
                />
                {errors.pinCode && <span className="error-message">{errors.pinCode}</span>}

                <input
                  type="text"
                  maxLength={10}
                  name="mobile"
                  value={address.mobile}
                  onChange={handleAddressChange}
                  onBlur={handleBlur} // Added onBlur event
                  placeholder="Mobile Number"
                  className={`input-field ${errors.mobile ? 'input-error' : ''}`}
                />
                {errors.mobile && <span className="error-message">{errors.mobile}</span>}
              </div>
            </div>

            <div className="payment-details">
              <h3 style={{ height: '40px' }}>Payment Details</h3>
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
              <h3 style={{ height: '40px' }}>Your Cart</h3>
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.imageUrl} alt={item.cat} />
                  <div className="item-details">
                    <p>{item.name}</p>
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
                <button className="pay-now-btn" onClick={() => {
                  clearCart();
                  navigate('/payment-success');
                }}>
                  Pay Now ₹{grandTotal.toFixed(2)}
                </button>
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
