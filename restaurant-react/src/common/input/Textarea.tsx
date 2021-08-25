import './Input.scss';

import { useField } from '@unform/core';
import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';

type InputProps = {
  label?: string;
};

export default function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement> & InputProps) {
  const { name, label, className, ...rest } = props;

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
        <textarea
          ref={inputRef}
          defaultValue={defaultValue}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          {...rest}
        />
      </div>
    </div>
  );
}
