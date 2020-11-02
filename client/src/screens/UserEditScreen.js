import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { getUserDetails, updateUser, resetUpdateUser } from '../actions/userActions'

import { FormContainer } from '../components/FormContainer'

export const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(state => state.userDetails);
  const { 
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate 
  } = useSelector(state => state.userUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch(resetUpdateUser());
      history.push('/admin/userlist');
      return;
    }
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
      return;
    }
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
  }, [dispatch, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader/>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={({ target: { checked }}) => setIsAdmin(checked)}
              >    
              </Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary'>Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

