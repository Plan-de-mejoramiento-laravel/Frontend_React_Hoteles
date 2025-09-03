import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: TitleProps) => {
  return <h1 className={`my-4 text-center ${className}`}>{children}</h1>;
};

export default Title;