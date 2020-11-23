import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { Message } from '../components/Message'
import { Loader } from '../components/Loader'

import { Paginate } from '../components/Paginate'
import { Product } from '../components/Product'
import { listProducts } from '../actions/productActions'

export const HomeScreen = ({ match }) => {
  const { keyword, pageNumber = 1 } = match.params;

  const dispatch = useDispatch();
  const { products, error, loading, page, pages } = useSelector(state => state.productList);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  )
}

