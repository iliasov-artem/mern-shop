import React from 'react'
import { Helmet } from 'react-helmet'

export const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To Shop',
  description: 'We sell the best products for cheap',
  keyword: 'electronics, buy electronics, cheap electronics'
}

