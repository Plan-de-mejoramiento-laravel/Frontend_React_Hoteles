import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Form, Row, Col, Button as BootstrapButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api';
import Alert from '../atoms/Alarms';

interface Room {
  room_type: 'Estandar' | 'Junior' | 'Suite';
  accommodation: 'Sencilla' | 'Doble' | 'Triple' | 'Cuadruple';
  quantity: number;
}

interface HotelFormData {
  name: string;
  address: string;
  city: string;
  nit: string;
  max_rooms: number;
  rooms: Room[];
}

interface HotelFormProps {
  hotelId?: number;
}

const HotelForm = ({ hotelId }: HotelFormProps) => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors }, reset, setError } = useForm<HotelFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rooms',
  });
  const [alert, setAlert] = useState<{ message: string; variant: 'success' | 'danger' | 'warning' | 'info' } | null>(null);

  useEffect(() => {
    if (hotelId) {
      const fetchHotel = async () => {
        try {
          const response = await api.get(`/hotels/${hotelId}`);
          reset(response.data);
        } catch (error) {
          console.error('Error al obtener los datos del hotel:', error);
          setAlert({ message: 'No se pudieron cargar los datos del hotel. Intenta de nuevo.', variant: 'danger' });
        }
      };
      fetchHotel();
    }
  }, [hotelId, reset]);

  const onSubmit = async (data: HotelFormData) => {
    setAlert(null);
    try {
      if (hotelId) {
        await api.put(`/hotels/${hotelId}`, data);
        setAlert({ message: 'Hotel actualizado exitosamente!', variant: 'success' });
      } else {
        await api.post('/hotels', data);
        setAlert({ message: 'Hotel creado exitosamente!', variant: 'success' });
      }
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        let errorMessage = 'Por favor, corrige los siguientes errores:';
        for (const key in validationErrors) {
          errorMessage += `\n- ${validationErrors[key][0]}`;
          setError(key as keyof HotelFormData, { type: 'manual', message: validationErrors[key][0] });
        }
        setAlert({ message: errorMessage, variant: 'warning' });
      } else {
        setAlert({ message: 'Error al guardar el hotel. Revisa la consola para más detalles.', variant: 'danger' });
      }
      console.error(error);
    }
  };

  const StyledForm = styled(Form)`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
  `;

  const FormTitle = styled.h2`
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin-bottom: 2rem;
    position: relative;

  `;

  const SectionTitle = styled.h3`
    font-family: 'Playfair Display', serif;
    color: #2c3e50;
    margin: 2rem 0 1.5rem 0;
    display: flex;
    align-items: center;
    
  `;

  const StyledButton = styled(BootstrapButton)`
    border-radius: 25px;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
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

    &.btn-add {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
      }
    }

    &.btn-remove {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(250, 112, 154, 0.4);
      }
    }

    &.btn-submit {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 1.1rem;
      padding: 1rem 3rem;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
      }
    }
  `;

  const RoomCard = styled.div`
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(102, 126, 234, 0.1);
    border-radius: 15px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
    }
  `;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>{hotelId ? 'Editar Hotel' : 'Crear Nuevo Hotel'}</FormTitle>
      
      {alert && <Alert message={alert.message} variant={alert.variant} />}
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Hotel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del Hotel"
              isInvalid={!!errors.name}
              {...register('name', { required: 'Este campo es requerido.' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección del Hotel"
              isInvalid={!!errors.address}
              {...register('address', { required: 'Este campo es requerido.' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ciudad del Hotel"
              isInvalid={!!errors.city}
              {...register('city', { required: 'Este campo es requerido.' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>NIT</Form.Label>
            <Form.Control
              type="text"
              placeholder="NIT del Hotel"
              isInvalid={!!errors.nit}
              {...register('nit', { required: 'Este campo es requerido.' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nit?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Máximo de Habitaciones</Form.Label>
            <Form.Control
              type="number"
              placeholder="Máx. Habitaciones"
              isInvalid={!!errors.max_rooms}
              {...register('max_rooms', { required: 'Este campo es requerido.', min: 1 })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.max_rooms?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      
      <SectionTitle>Configuración de Habitaciones</SectionTitle>
      
      <div className="text-center mb-4">
        <StyledButton
          type="button"
          className="btn-add"
          onClick={() => append({ room_type: 'Estandar', accommodation: 'Doble', quantity: 1 })}
        >
          Añadir Habitación
        </StyledButton>
      </div>
      
      <div>
        {fields.map((field, index) => (
          <RoomCard key={field.id}>
            <Row className="align-items-end">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Tipo de Habitación</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.rooms?.[index]?.room_type}
                    {...register(`rooms.${index}.room_type`, { required: 'Este campo es requerido.' })}
                  >
                    <option value="Estandar">Estandar</option>
                    <option value="Junior">Junior</option>
                    <option value="Suite">Suite</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.rooms?.[index]?.room_type?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Acomodación</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.rooms?.[index]?.accommodation}
                    {...register(`rooms.${index}.accommodation`, { required: 'Este campo es requerido.' })}
                  >
                    <option value="Sencilla">Sencilla</option>
                    <option value="Doble">Doble</option>
                    <option value="Triple">Triple</option>
                    <option value="Cuadruple">Cuadruple</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.rooms?.[index]?.accommodation?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Cantidad"
                    isInvalid={!!errors.rooms?.[index]?.quantity}
                    {...register(`rooms.${index}.quantity`, { required: 'Este campo es requerido.', min: 1 })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rooms?.[index]?.quantity?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={1}>
                <StyledButton
                  className="btn-remove"
                  onClick={() => remove(index)}
                >
                  Eliminar
                </StyledButton>
              </Col>
            </Row>
          </RoomCard>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <StyledButton
          type="submit"
          className="btn-submit"
        >
          {hotelId ? 'Actualizar Hotel' : 'Guardar Hotel'}
        </StyledButton>
      </div>
    </StyledForm>
  );
};

export default HotelForm;