// MensCollection.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import m1 from '../assets/men1.jpg';
import m2 from '../assets/men2.jpg';
import m3 from '../assets/men3.jpg';
import m4 from '../assets/men4.jpg';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const MensCollection = ({ onAddToCart }) => {
  const mensCollection = [
    { id: 1, img: m1, cat: 'Party Wear', price: '₹1000' },
    { id: 2, img: m2, cat: 'Casual Wear', price: '₹800' },
    { id: 3, img: m3, cat: 'Daily Wear', price: '₹400' },
    { id: 4, img: m4, cat: 'Occasion Wear', price: '₹2400' }
  ];
  const handleAddToCart = (item) => {
    onAddToCart(item);
    toast.success(`${item.cat} added to cart!`); // Show a success toast notification
  };

  return (
    <>
     <div style={{ backgroundColor: '#E3BE84', color: 'white', fontSize: '40px', padding: '15px' }}>
        Men's Collection
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
        {mensCollection.map((item, id) => (
          <Card key={id} style={{ width: '18rem', height: '30rem' }}>
            <Card.Img variant="top" src={item.img} style={{ height: '60%' }} />
            <Card.Body>
              <Card.Title  style={{height:'40px'}}>{item.cat}</Card.Title>
              <Card.Text>{item.price}</Card.Text>
              <Button
                style={{ backgroundColor: 'orange', border: 'none' }}
                onClick={() => handleAddToCart(item)}
              >
                Add to cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

    </>
  );
};

export default MensCollection;
