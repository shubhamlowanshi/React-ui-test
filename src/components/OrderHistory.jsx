import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './orderjis.css'; // Custom CSS for DatePicker styling

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [showTodayOrders, setShowTodayOrders] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) {
          setError('User not logged in');
          return;
        }

        setUsername(user.username);

        const res = await axios.get(`http://localhost:3000/api/user/${user._id}`);
        if (Array.isArray(res.data)) {
          setOrders(res.data);
          setFilteredOrders(res.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const today = new Date();
  const todayString = today.toLocaleDateString();

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/order/${orderId}`);
      if (response.status === 200) {
        setOrders(orders.filter(order => order._id !== orderId));
        setFilteredOrders(filteredOrders.filter(order => order._id !== orderId));
        alert('Order deleted successfully');
      } else {
        alert('Failed to delete order');
      }
    } catch (err) {
      alert('Failed to delete order');
      console.error('Error deleting order:', err);
    }
  };

  const filterTodayOrders = () => {
    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate.toLocaleDateString() === todayString;
    });
    setFilteredOrders(todayOrders);
    setShowTodayOrders(true);
  };

  const showAllOrders = () => {
    setFilteredOrders(orders);
    setShowTodayOrders(false);
  };

  const handleDateRangeFilter = () => {
    const filteredByDate = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
    setFilteredOrders(filteredByDate);
    setShowTodayOrders(false);
    setShowDateRangePicker(false);
  };

  const totalOrders = orders.length;

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <Container>
      <h2 className="text-center my-4">Order History</h2>

      {/* Buttons for filtering */}
      <div className="text-center mb-3">
        <Button variant="primary" onClick={filterTodayOrders} className="mx-2">
          Today's Orders
        </Button>
        <Button variant="secondary" onClick={showAllOrders} className="mx-2">
          Total Orders
        </Button>
        <Button
          variant={showDateRangePicker ? 'dark' : 'info'}
          onClick={() => setShowDateRangePicker(!showDateRangePicker)}
          className="mx-2"
        >
          {showDateRangePicker ? 'Hide Date Picker' : 'Select Date Range'}
        </Button>
      </div>

      {/* Date Range Picker */}
      {showDateRangePicker && (
        <div className="text-center my-3">
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="form-control"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <Button variant="success" onClick={handleDateRangeFilter} className="mx-2">
              ✅ Apply
            </Button>
            <Button variant="outline-danger" onClick={() => setShowDateRangePicker(false)} className="mx-2">
              ❌ Cancel
            </Button>
          </div>
        </div>
      )}

      <h4 className="text-center my-3">
        {showTodayOrders ? `Today's Orders` : `Total Orders: ${totalOrders}`}
      </h4>

      <Row>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Col md={4} sm={12} key={order._id} className="mb-4">
              <Card className="order-card">
                <Card.Body>
                  <Card.Title>Order Number: {order._id}</Card.Title>
                  <Card.Title>Username: {username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Total: ₹{order.grandTotal}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Address:</strong>{' '}
                    {order.address
                      ? `${order.address.street}, ${order.address.city}, ${order.address.state}`
                      : 'No address provided'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Mobile No.:</strong>{' '}
                    {order.address ? `${order.address.mobile}` : 'No address provided'}
                  </Card.Text>

                  <ListGroup className="list-group-flush">
                    {order.cartItems.map((item, index) => (
                      <ListGroupItem key={index}>
                        <img
                          src={item.imageUrl}
                          alt=""
                          style={{ height: '80px', width: '80px' }}
                          className="mb-2"
                        />
                        <br />
                        <strong>{item.name}</strong>
                        <br />
                        <small>Quantity: {item.qty}</small>
                        <br />
                        <small>Price: ₹{item.price}</small>
                      </ListGroupItem>
                    ))}
                  </ListGroup>

                  <Button
                    variant="danger"
                    className="mt-3"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete Order
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </Row>
    </Container>
  );
};

export default OrderHistory;
