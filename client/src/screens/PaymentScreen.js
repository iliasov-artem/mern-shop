import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer } from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import { Checkout } from '../components/Checkout'

export const PaymentScreen = ({ history }) => {

  const { shippingAddress } = useSelector(state => state.cart);

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  }

  return (
    <FormContainer>
      <Checkout step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={({ target: { value }}) => setPaymentMethod(value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Swift'
              id='Swift'
              name='paymentMethod'
              value='Swift'
              onChange={({ target: { value }}) => setPaymentMethod(value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
