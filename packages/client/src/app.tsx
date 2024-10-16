import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccommodationSearchPage from './pages/AccommodationSearch';
import HotelPage from './pages/Hotel';
import CityPage from './pages/City';
import CountryPage from './pages/Country';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<AccommodationSearchPage />} />
        <Route path="/hotels/:id" element={<HotelPage />} />
        <Route path="/cities/:id" element={<CityPage />} />
        <Route path="/countries/:isoCode" element={<CountryPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;