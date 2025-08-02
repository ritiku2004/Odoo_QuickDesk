import React from 'react';

const Button = ({ children, type = 'button', onClick, fullWidth = false }) => {
  return (
    <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-white bg-blue-600 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out ${fullWidth ? 'w-full' : ''}`}
  >
    {children}
  </button>
  );
};

export default Button;