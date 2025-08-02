import React from 'react';

const Input = ({ id, type = 'text', placeholder, value, onChange, ...props }) => {
  return (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
    {...props}
  />
);

};

export default Input;