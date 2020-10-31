import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { Checkout } from '../components/Checkout'

export const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const {
    shippingAddress,
    paymentMethod,
    cartItems,
  } = useSelector(state => state.cart);

  const { address, city, country, postalCode } = shippingAddress;

  const addDecimals = number => (Math.round(number * 100) / 100).toFixed(2);

  const itemsPrice = addDecimals(cartItems.reduce((acc, { price, quantity }) => (
    acc + price * quantity
  ), 0));

  // TODO Shipping depends on location
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 30);
  const taxPrice = addDecimals(Number(0.13 * itemsPrice));
  const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice));

  const { order, success, error } = useSelector(state => state.orderCreate);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order.createdOrder._id}`)
    }
    // eslint-disable-next-line 
  }, [history, success]);
  
  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    }));
  }

  return (
    <>
      <Checkout step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {` ${address}, ${city}, ${postalCode}, ${country}`}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0
                ? <Message>Your cart is empty</Message>
                : <ListGroup variant='flush'>
                    {cartItems.map(({ product, image, name, quantity, price }) => (
                      <ListGroup.Item key={product}>
                        <Row>
                          <Col md={1}>
                            <Image src={image} alt={name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${product}`}>
                              {name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {`${quantity} x ${price} = ${addDecimals(quantity * price)}`}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
              }
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

PlaceOrderScreen.propTypes = {

}
