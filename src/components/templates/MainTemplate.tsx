import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import Navbar from '../molecules/Navbar';

interface MainTemplateProps {
  children: React.ReactNode;
}

const StyledContainer = styled(Container)`
  margin-top: 120px;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
`;

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <>
      <Navbar />
      <StyledContainer>
        {children}
      </StyledContainer>
    </>
  );
};

export default MainTemplate;