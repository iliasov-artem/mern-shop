import React from 'react'
import PropTypes from 'prop-types'

export const Rating = ({ value, text, color }) => {
  const starsCount = Array.from({ length: 5 }, (_, i) => i + 1);

  const getClassName = (star) => (
    value >= star ? 'fas fa-star' : value >= (star - 0.5) ? 'fas fa-star-half-alt' : 'far fa-star'
  );

  return (
    <div className='rating'>
      {starsCount.map(star => (
        <span key={star}>
          <i className={getClassName(star)} style={{ color }} />
        </span>
      ))}
      <span>{text}</span>
    </div>
  );
}

Rating.defaultProps = {
  color: '#f8e825',
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}
