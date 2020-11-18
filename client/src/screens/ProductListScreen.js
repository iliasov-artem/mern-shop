import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import {
  createProduct,
  deleteProduct,
  listProducts,
  resetCreateProduct
} from '../actions/productActions'

export const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(state => state.productList);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete
  } = useSelector(state => state.productDelete);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct
  } = useSelector(state => state.productCreate);

  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    dispatch(resetCreateProduct());

    if (userInfo && !userInfo.isAdmin) {
      history.push('/login');
      return;
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
      return;
    }
    dispatch(listProducts());
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct());
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className="fas fa-plus"/> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='dark' className='btn-sm mx-1'>
                      <i className='fas fa-edit'/>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm mx-1'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

