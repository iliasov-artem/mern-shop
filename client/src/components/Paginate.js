import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map((x, i) => (
        <LinkContainer
          key={i}
          to={!isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}` : `/admin/productlist/${x + 1}`}
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

