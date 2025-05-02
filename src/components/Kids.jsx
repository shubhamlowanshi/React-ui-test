import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import k1 from '../assets/kid1.jpg'
import k2 from '../assets/kid2.jpg'
import k3 from '../assets/kid3.jpg'
import k4 from '../assets/kid4.jpg'
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles



const Kids = ({ onAddToCart }) => {
  const kidSection = [
    { id:9,img: k1, cat: 'Night suits', price: 1000 },
    {id:10, img: k2, cat: 'regular', price: 800 },
    { id:11, img: k3, cat: 'Asthetic', price: 400 },
    { id:12, img: k4, cat: 'Occasion Wear', price: 2400 },
    { id:13, img: k1, cat: 'party wear', price: 2400 },
    { id:14 ,img: k2, cat: 'sober', price: 2400 }
  ];

  const handleAddToCart = (item) => {
    onAddToCart(item);
    toast.success(`${item.cat} added to cart!`); // Show a success toast notification
  };

  return (
    <>
      <div style={{ backgroundColor: '#E3BE84', color: 'white', fontSize: '40px', padding: '15px' }}>
        Kid's Collection
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
        {kidSection.map((item, id) => (
          <Card key={id} style={{ width: '18rem', height: '30rem' }}>
            <Card.Img variant="top" src={item.img} style={{ height: '60%' }} />
            <Card.Body>
              <Card.Title  style={{height:'40px'}}>{item.cat}</Card.Title>
              <Card.Text>₹{item.price}</Card.Text>
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
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </>
  );
};

export default Kids;