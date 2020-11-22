import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim() !== '') {
      history.push(`/search/${keyword}`);
      return;
    }
    return history.push('/');
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        className='mr-sm-2 ml-sm-5'
        placeholder='Search Products...'
        onChange={({ target: { value }}) => setKeyword(value)}
      />
      <Button type='submit' variant='outline-success' className='ml-sm-2'>
        Search
      </Button>
    </Form>
  )
}

