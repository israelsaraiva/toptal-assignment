import './Input.scss';

import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';

type InputProps = {
  label?: string;
  inputType?: 'search';
};

export default function Input(props: InputHTMLAttributes<HTMLInputElement> & InputProps) {
  const { name, label, className, inputType, ...rest } = props;

  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name as string);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <div className={`Input ${className}`}>
      {label && <label className="form-label">{label}</label>}

      <div className="Input-container">
        <input
          ref={inputRef}
          type="text"
          defaultValue={defaultValue}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          {...rest}
        />
        {inputType && <FiSearch className="search-icon" />}
      </div>
    </div>
  );
}
