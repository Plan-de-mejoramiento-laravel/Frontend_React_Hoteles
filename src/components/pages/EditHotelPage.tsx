import { useParams } from 'react-router-dom';
import HotelForm from '../organisms/HotelFrom';
import FormTemplate from '../templates/FromTemplate';

const EditHotelPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <FormTemplate>
        <p className="text-center text-danger">No se proporcionó un ID de hotel para editar.</p>
      </FormTemplate>
    );
  }

  return (
    <FormTemplate>
      <h1 className="my-4 text-center">Editar Hotel</h1>
      <HotelForm hotelId={parseInt(id)} />
    </FormTemplate>
  );
};

export default EditHotelPage;