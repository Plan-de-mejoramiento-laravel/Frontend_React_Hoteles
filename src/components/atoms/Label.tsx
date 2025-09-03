import React from 'react';
import { Form } from 'react-bootstrap';

interface LabelProps {
  children: React.ReactNode;
}

const Label = ({ children }: LabelProps) => {
  return <Form.Label>{children}</Form.Label>;
};

export default Label;