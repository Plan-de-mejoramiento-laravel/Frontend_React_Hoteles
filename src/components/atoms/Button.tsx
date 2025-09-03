import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

interface ButtonProps {
  type?: 'submit' | 'button';
  variant?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return <BootstrapButton {...rest}>{children}</BootstrapButton>;
};

export default Button;