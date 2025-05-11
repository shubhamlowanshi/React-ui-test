// MensCollection.js
import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import m1 from '../assets/men1.jpg';
import m2 from '../assets/men2.jpg';
import m3 from '../assets/men3.jpg';
import m4 from '../assets/men4.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MensCollection = ({ onAddToCart }) => {

  const [mensCollection, setmensCollection] = useState([
    // { id: 1, img: m1, cat: 'Party Wear', price: '₹1000' },
    // { id: 2, img: m2, cat: 'Casual Wear', price: '₹800' },
    // { id: 3, img: m3, cat: 'Daily Wear', price: '₹400' },
    // { id: 4, img: m4, cat: 'Occasion Wear', price: '₹2400' }
  ]);
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/men');
        setmensCollection(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();


  }, []);

  const handleAddToCart = (item) => {
    onAddToCart(item);
    toast.success(`${item.name} added to cart!,`);
  };

  return (
    <>
      <div style={{ backgroundColor: '#E3BE84', color: 'white', fontSize: '40px', padding: '15px' }}>
        Men's Collection
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '80px',
          marginLeft:"30px",
          justifyContent: 'start',
          padding: '40px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {mensCollection.map((item, id) => (
          <Card
            key={item._id}
            style={{
              width: '280px',
              height: '450px',
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="product-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            }}
          >
            <Card.Img
              variant="top"
              src={item.imageUrl}
              alt={item.name}
              style={{ height: '60%', objectFit: 'cover' }}
            />
            <Card.Body style={{ padding: '16px' ,overflow:'hidden' }}>
              <Card.Title style={{ height: '30px', fontSize: '1.1rem', fontWeight: '600' }}>
                {item.name}
              </Card.Title>
              <p>{item.description}</p>
              <Card.Text style={{ fontSize: '1rem', color: '#333', marginBottom: '12px' }}>
              <strong>Price: </strong>₹{item.price.toLocaleString()}
              </Card.Text>
              <Button
                style={{
                  backgroundColor: '#ff9800',
                  border: 'none',
                  width: '100%',
                  padding: '10px',
                  fontWeight: '500',
                  borderRadius: '8px',
                }}
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

    </>
  );
};

export default MensCollection;
