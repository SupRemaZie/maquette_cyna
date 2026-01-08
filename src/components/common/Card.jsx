import React from 'react';

const Card = ({ children, className = '', hover = false, onClick, ...props }) => {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';
  const hoverClasses = hover ? 'transition-transform duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '';
  
  const classes = `${baseClasses} ${hoverClasses} ${className}`.trim().replace(/\s+/g, ' ');
  
  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
