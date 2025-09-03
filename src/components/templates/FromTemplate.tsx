import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../molecules/Navbar';

interface FormTemplateProps {
  children: React.ReactNode;
}

const FormTemplate = ({ children }: FormTemplateProps) => {
  return (
    <>
      <Navbar />
      <Container className="my-5">
        <div className="p-4 border rounded shadow-sm">
          {children}
        </div>
      </Container>
    </>
  );
};

export default FormTemplate;