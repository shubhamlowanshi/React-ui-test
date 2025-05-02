import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import MensCollection from "./components/MensCollection";
import Womens from "./components/Womens";
import Kids from "./components/Kids";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Navbars from "./components/Navbar";
import Checkout from "./components/Checkout";
import PaymentSuccess from "./components/PaymentSuccess";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    // Load initial cart items from localStorage (if any)
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const user = JSON.parse(localStorage.getItem('user'));
    if (auth === "true") {
      setIsAuthenticated(true);
      if (user && user.name) {
        setUsername(user.name);
      }
    }
  }, []);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems, item];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Store in localStorage
      return updatedCart;
    });
  };
    useEffect(() => {
    // Update localStorage whenever cartItems changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  const handleAddToCart = (item) => {
    const exist = cartItems.find((x) => x.id === item.id);
    if (exist) {
      setCartItems(cartItems.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  const handleRemoveFromCart = (item) => {
    const exist = cartItems.find((x) => x.id === item.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== item.id));
    } else {
      setCartItems(cartItems.map(x => x.id === item.id ? { ...x, qty: x.qty - 1 } : x));
    }
  };

  const handleDeleteItem = (item) => {
    setCartItems(cartItems.filter((x) => x.id !== item.id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    
    <Router>
      {/* Pass username and isAuthenticated to Navbar */}
      <Navbars 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
        username={username} 
      />

      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
            <Route path="/register" element={<Registration setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/mens" element={<MensCollection onAddToCart={handleAddToCart} />} />
            <Route path="/womens" element={<Womens onAddToCart={handleAddToCart} />} />
            <Route path="/kids" element={<Kids onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={ 
              <Cart 
                cartItems={cartItems} 
                onAddToCart={handleAddToCart} 
                onRemoveFromCart={handleRemoveFromCart} 
                onDeleteItem={handleDeleteItem} 
              /> 
            } />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
