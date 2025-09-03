import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import api from '../../services/api';
import { GeoAltFill, PersonFill, DoorOpenFill } from 'react-bootstrap-icons'

interface Room {
  room_type: 'Estandar' | 'Junior' | 'Suite';
  accommodation: 'Sencilla' | 'Doble' | 'Triple' | 'Cuadruple';
  quantity: number;
}

interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  nit: string;
  max_rooms: number;
  rooms: Room[];
}

const HotelDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await api.get(`/hotels/${id}`);
        setHotel(response.data);
        setLoading(false);
      } catch (err) {
        setError('No se pudo cargar la información del hotel.');
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <h2 className="text-secondary">Cargando...</h2>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <h2 className="text-danger">{error}</h2>
        <Button variant="outline-dark" onClick={() => navigate('/')} className="mt-3">
          Volver
        </Button>
      </Container>
    );
  }

  if (!hotel) {
    return (
      <Container className="text-center mt-5">
        <h2 className="text-secondary">Hotel no encontrado</h2>
        <Button variant="outline-dark" onClick={() => navigate('/')} className="mt-3">
          Volver
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="shadow-lg border-0 rounded-3 p-4 bg-light">
        <Card.Body>
          <Card.Title as="h1" className="text-dark mb-3 fw-bold">{hotel.name}</Card.Title>
          <Card.Subtitle className="mb-4 text-muted fst-italic">{hotel.city}</Card.Subtitle>
          <hr />
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <h5><GeoAltFill className="me-2 text-info"/>Dirección</h5>
                <p className="ms-4 text-secondary">{hotel.address}</p>
              </div>
              <div className="mb-3">
                <h5><PersonFill className="me-2 text-info"/>NIT</h5>
                <p className="ms-4 text-secondary">{hotel.nit}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <h5><DoorOpenFill className="me-2 text-info"/>Máx. Habitaciones</h5>
                <p className="ms-4 text-secondary">{hotel.max_rooms}</p>
              </div>
            </Col>
          </Row>
          <hr />
          <h4 className="mb-3 text-dark">Tipos de Habitaciones</h4>
          {hotel.rooms && hotel.rooms.length > 0 ? (
            <Row>
              {hotel.rooms.map((room, index) => (
                <Col md={4} key={index} className="mb-3">
                  <Card className="bg-white h-100 shadow-sm border-0">
                    <Card.Body>
                      <Card.Title as="h6" className="text-dark">{room.room_type}</Card.Title>
                      <Card.Text>
                        <small className="text-secondary">Acomodación: **{room.accommodation}**</small>
                        <br/>
                        <small className="text-secondary">Cantidad: **{room.quantity}**</small>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-muted">No hay información de habitaciones disponible.</p>
          )}

          <div className="d-flex justify-content-end mt-4">
            <Button variant="outline-dark" onClick={() => navigate('/')}>
              Volver
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HotelDetailsPage;