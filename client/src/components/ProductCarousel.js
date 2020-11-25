import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { Loader } from './Loader'
import { Message } from './Message'
import { listTopProducts } from '../actions/productActions'

export const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(state => state.productTopRated);

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch])
  
  if (loading || error) {
    return loading ? <Loader /> : <Message variant='danger'>{error}</Message>
  }

  return (
    <Carousel pause='hover' className='bg-primary'>
      {products.map(({ _id, image, name, price }) => (
        <Carousel.Item key={_id}>
          <Link to={`/product/${_id}`}>
            <Image src={image} alt={name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>{name} (${price})</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

