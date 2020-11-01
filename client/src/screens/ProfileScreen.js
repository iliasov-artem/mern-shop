import React, { useState, useEffect } from 'react'

import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

export const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector(state => state.userDetails);
  const { userInfo } = useSelector(state => state.userLogin);
  const { success } = useSelector(state => state.userUpdateProfile);
  const { 
    orders, 
    error: errorOrders, 
    loading: loadingOrders 
  } = useSelector(state => state.orderListMy);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    } 
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    }
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={({ target: { value }}) => setName(value)}
            >    
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={({ target: { value }}) => setEmail(value)}
            >    
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={({ target: { value }}) => setPassword(value)}
            >    
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={({ target: { value }}) => setConfirmPassword(value)}
            >    
            </Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>Update</Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
  {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice}</td>
            <td>
              {order.isPaid ? (
                order.paidAt.substring(0, 10)
              ) : (
              <i className='fas fa-times' style={{ color: 'red '}} />
            )}
            </td>
            <td>
              {order.isDelivered ? (
                order.deliveredAt.substring(0, 10)
              ) : (
              <i className='fas fa-times' style={{ color: 'red '}} />
            )}
            </td>
            <td>
              <LinkContainer to={`/order/${order._id}`}>
                <Button className='btn-sm' variant='info'>Details</Button>
              </LinkContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )}
      </Col>
    </Row>
  )
}

