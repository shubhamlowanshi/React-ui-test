// import React from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const CardPayment = ({ amount, onSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch('http://localhost:3000/api/payment/create-payment-intent', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount }),
//     });

//     const { clientSecret } = await res.json();

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (result.error) {
//       alert(result.error.message);
//     } else {
//       if (result.paymentIntent.status === 'succeeded') {
//         alert('Payment successful!');
//         onSuccess(); // Callback to clear cart and navigate
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>Pay ₹{(amount / 100).toFixed(2)}</button>
//     </form>
//   );
// };

// export default CardPayment;
