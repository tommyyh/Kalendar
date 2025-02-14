import React from 'react';
import style from './input.module.scss';

const Input = ({ type, placeholder, name, onChange, value, ...children }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={(e) => onChange(e.target.value, name)}
      value={value}
      className={style.input}
      {...children}
    />
  );
};

export default Input;
