import { Alert as BootstrapAlert } from 'react-bootstrap';

interface AlertProps {
  message: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
}

const Alert = ({ message, variant }: AlertProps) => {
  return (
    <BootstrapAlert variant={variant} className="my-3">
      {message}
    </BootstrapAlert>
  );
};

export default Alert;