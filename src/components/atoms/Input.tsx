import React from 'react';
import { Form } from 'react-bootstrap';

interface InputProps {
  type?: string;
  placeholder?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', placeholder, error, ...rest }, ref) => {
    return (
      <Form.Control
        type={type}
        placeholder={placeholder}
        isInvalid={!!error}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default Input;