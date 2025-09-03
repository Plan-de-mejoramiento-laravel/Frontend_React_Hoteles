import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import CreateHotelPage from './components/pages/CreateHotelPage';
import EditHotelPage from './components/pages/EditHotelPage';
import HotelDetailsPage from './components/pages/HotelDetailsPage'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateHotelPage />} />
        <Route path="/edit/:id" element={<EditHotelPage />} />
        <Route path="/hotels/:id" element={<HotelDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;