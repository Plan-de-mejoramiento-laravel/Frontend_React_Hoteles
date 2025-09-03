import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';
import api from '../../services/api';
import HotelCard from '../molecules/HotelCard';

interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  nit: string;
  max_rooms: number;
}

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const MainTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  position: relative;


  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 150px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-weight: 500;
  font-size: 0.9rem;
`;

const CreateButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 25px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  font-size: 1.1rem;
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

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 100%;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const HotelList = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get('/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Error al obtener los hoteles:', error);
      }
    };
    fetchHotels();
  }, []);

  const handleDeleteHotel = async (id: number) => {
    try {
      await api.delete(`/hotels/${id}`);
      setHotels(hotels.filter(hotel => hotel.id !== id));
      alert('Hotel eliminado exitosamente.');
    } catch (error) {
      console.error('Error al eliminar el hotel:', error);
      alert('Error al eliminar el hotel.');
    }
  };

  const totalRooms = hotels.reduce((sum, hotel) => sum + hotel.max_rooms, 0);
  const avgRooms = hotels.length > 0 ? Math.round(totalRooms / hotels.length) : 0;

  return (
    <Container>
      <HeroSection>
        <MainTitle>Hotels Collection</MainTitle>
        <Subtitle>
          Descubre nuestra exclusiva colección de hoteles, diseñados para brindar 
          experiencias inolvidables y el más alto nivel de confort y elegancia.
        </Subtitle>
        
        <StatsContainer>
          <StatCard className="pulse-animation">
            <StatNumber>{hotels.length}</StatNumber>
            <StatLabel>Hoteles</StatLabel>
          </StatCard>
          <StatCard className="pulse-animation" style={{ animationDelay: '0.5s' }}>
            <StatNumber>{totalRooms}</StatNumber>
            <StatLabel>Habitaciones</StatLabel>
          </StatCard>
          <StatCard className="pulse-animation" style={{ animationDelay: '1s' }}>
            <StatNumber>{avgRooms}</StatNumber>
            <StatLabel>Promedio</StatLabel>
          </StatCard>
        </StatsContainer>

        <LinkContainer to="/create">
          <CreateButton>
            Crear Nuevo Hotel
          </CreateButton>
        </LinkContainer>
      </HeroSection>

      {hotels.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {hotels.map((hotel, index) => (
            <Col key={hotel.id}>
              <div style={{ animationDelay: `${index * 0.1}s` }}>
                <HotelCard hotel={hotel} onDelete={handleDeleteHotel} />
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <EmptyState>
          <EmptyIcon>Hotel</EmptyIcon>
          <EmptyTitle>No hay hoteles registrados</EmptyTitle>
          <EmptyText>
            Comienza creando tu primer hotel y construye tu imperio hotelero.
          </EmptyText>
          <LinkContainer to="/create">
            <CreateButton>
              Crear Mi Primer Hotel
            </CreateButton>
          </LinkContainer>
        </EmptyState>
      )}
    </Container>
  );
};

export default HotelList;