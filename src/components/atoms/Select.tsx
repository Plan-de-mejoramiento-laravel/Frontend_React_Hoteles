import React from 'react';
import { Form } from 'react-bootstrap';

interface SelectProps {
  options: string[];
  error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, error, ...rest }, ref) => {
    return (
      <Form.Select isInvalid={!!error} ref={ref} {...rest}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    );
  }
);

export default Select;