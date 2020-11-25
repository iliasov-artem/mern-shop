import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Rating } from '../components/Rating'
import { Meta } from '../components/Meta'
import {
  listProductDetails,
  resetReviewCreateProduct,
  createProductReview,
} from '../actions/productActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'

export const ProductScreen = ({ history, match: { params: { id }}}) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const { product, error, loading, loaded } = useSelector(state => state.productDetails);
  const {
    error: errorProductReview,
    success: successProductReview
  } = useSelector(state => state.productReviewCreate);
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted');
      setRating(0);
      setComment('');
      dispatch(resetReviewCreateProduct());
    }
    dispatch(listProductDetails(id));
    return () => {
      dispatch(resetReviewCreateProduct());
    }
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?quantity=${quantity}`)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  }

  if (loading || error) {
    const content = loading ? <Loader /> : <Message variant='danger'>{error}</Message>;
    return (
      <>
        <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
        {content}
      </>
    );
  }

  if (!loaded) {
    return null;
  }

  const {
    countInStock,
    description,
    image,
    name,
    numReviews,
    price,
    rating: currentRating,
    reviews
  } = product;

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>Go Back</Link>
      <Meta title={name} />
      <Row>
        <Col md={6}>
          <Image src={image} alt={name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={currentRating} text={`${numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={quantity}
                        onChange={({ target: { value }}) => setQuantity(value)}
                      >
                        {[...Array(countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {reviews.length === 0 && <Message>No reviews</Message>}
          <ListGroup variant='flush'>
            {reviews.map(review => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ListGroup.Item>
            <h2>Write a Customer Review</h2>
            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
            {userInfo ? (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='rating'>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as='select'
                    value={rating}
                    onChange={({ target: { value }}) => setRating(value)}
                  >
                    <option value=''>Select...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='comment'>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='3'
                    value={comment}
                    onChange={({ target: { value }}) => setComment(value)}
                  >
                  </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Submit</Button>
              </Form>
            ) : (
              <Message>
                Please <Link to='/login'>sign in</Link> to write a review
              </Message>
            )}
          </ListGroup.Item>
        </Col>
      </Row>
    </>
  );
}
