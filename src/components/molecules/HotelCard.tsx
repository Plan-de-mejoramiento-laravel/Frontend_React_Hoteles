import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { InfoCircleFill, GeoAltFill, PersonFill, DoorOpenFill, StarFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  nit: string;
  max_rooms: number;
}

interface HotelCardProps {
  hotel: Hotel;
  onDelete: (id: number) => void;
}

const StyledCard = styled(Card)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
    
    .hotel-image {
      transform: scale(1.1);
    }
  }
`;

const HotelImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;

  &::before {
    content: 'HOTEL';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    opacity: 0.3;
    color: white;
    font-weight: bold;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
  }
`;

const StyledCardBody = styled(Card.Body)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: calc(100% - 200px);
`;

const HotelTitle = styled(Card.Title)`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

const CityTag = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
  width: fit-content;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;

  svg {
    margin-right: 0.5rem;
    color: #667eea;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 25px;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.3s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &.btn-edit {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
    }
  }

  &.btn-delete {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(250, 112, 154, 0.4);
    }
  }
`;

const InfoButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: #667eea;
    color: white;
    transform: scale(1.1);
  }
`;

const RatingStars = styled.div`
  display: flex;
  margin-bottom: 1rem;
  
  svg {
    color: #ffd700;
    margin-right: 2px;
  }
`;

const HotelCard = ({ hotel, onDelete }: HotelCardProps) => {
  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate(`/hotels/${hotel.id}`);
  };

  return (
    <StyledCard className="float-animation">
      <HotelImage className="hotel-image" />
      <InfoButton onClick={handleInfoClick}>
        <InfoCircleFill />
      </InfoButton>
      
      <StyledCardBody>
        <HotelTitle>{hotel.name}</HotelTitle>
        <CityTag>{hotel.city}</CityTag>
        
        <RatingStars>
          {[...Array(5)].map((_, i) => (
            <StarFill key={i} />
          ))}
        </RatingStars>
        
        <div className="flex-grow-1">
          <InfoItem>
            <GeoAltFill />
            <span>{hotel.address}</span>
          </InfoItem>
          <InfoItem>
            <PersonFill />
            <span>NIT: {hotel.nit}</span>
          </InfoItem>
          <InfoItem>
            <DoorOpenFill />
            <span>Máx. habitaciones: {hotel.max_rooms}</span>
          </InfoItem>
        </div>
        
        <div className="d-flex gap-2 mt-3">
          <LinkContainer to={`/edit/${hotel.id}`} className="flex-fill">
            <StyledButton className="btn-edit w-100">
              ✏️ Editar
            </StyledButton>
          </LinkContainer>
          <StyledButton 
            className="btn-delete flex-fill" 
            onClick={() => onDelete(hotel.id)}
          >
            🗑️ Eliminar
          </StyledButton>
        </div>
      </StyledCardBody>
    </StyledCard>
  );
};

export default HotelCard;