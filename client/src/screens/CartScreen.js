import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

export const CartScreen = ( {match, location, history }) => {
  const productId = match.params.id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const { cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    } 
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(({ product, image, name, price, countInStock, quantity }) => (
              <ListGroup.Item key={product}>
                <Row>
                  <Col md={2}>
                    <Image src={image} alt={name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${product}`}>{name}</Link>
                  </Col>
                  <Col md={2}>{price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={quantity}
                      onChange={({ target: { value }}) => dispatch(addToCart(product, Number(value)))}
                    >
                      {[...Array(countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(product)}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({ cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h2>
              ${cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}