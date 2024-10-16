import { useState, type ChangeEvent } from 'react';
import { debounce } from 'lodash';
import { multiSearch } from '../../utils/fetch';

const DEBOUNCE_TIME =  150;

const AccommodationSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [hotels, setHotels] = useState<HotelResult[]>([]);
  const [cities, setCities] = useState<CityResult[]>([]);
  const [countries, setCountries] = useState<CountryResult[]>([]);

  const resetValues = () => {
    setSearchTerm('');
    setHotels([]);
    setCities([]);
    setCountries([]);
    setShowClearBtn(false);
  };

  // Debounced search function
  const search = (
    debounce(async (value: string) => {
      try {
        const searchResults = await multiSearch(value);
        setShowClearBtn(true);
        setHotels(searchResults.hotels);
        setCities(searchResults.cities);
        setCountries(searchResults.countries);
      } catch (err) {
        resetValues();
      }
    }, DEBOUNCE_TIME));

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ;
    setSearchTerm(value);
    if (value.trim() === '') {
      resetValues();
      return;
    }
    search(value);
  };

  const handleButtonXClick = () => {
    resetValues();
  };

  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="dropdown">
            <div className="form">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control form-input"
                placeholder="Search accommodation..."
                value={searchTerm}
                onChange={handleInputChange}
              />
              {showClearBtn && (
                <span onClick={handleButtonXClick} className="left-pan">
                  <i className="fa fa-close"></i>
                </span>
              )}
            </div>
            {!!hotels.length && (
              <div className="search-dropdown-menu dropdown-menu w-100 show p-3">
                <div>
                  <h2>Hotels</h2>
                  <ul className="no-bullets-list">
                    {hotels.length ? hotels.map((hotel) => (
                      <li key={`hotel-${hotel.id}`}>
                        <a href={`/hotels/${hotel.id}`} className="dropdown-item">
                          <i className="fa fa-building mr-2"></i>
                          {hotel.name}
                        </a>
                        <hr className="divider" />
                      </li>
                    )) : <li>No hotels matched</li>}
                  </ul>
                </div>
                <div className="mt-4">
                <h2>Countries</h2>
                  <ul className="no-bullets-list">
                    {countries.length ? countries.map((country) => (
                      <li key={`country-${country.id}`}>
                        <a href={`/countries/${country.isoCode}`} className="dropdown-item">
                          <i className="fa fa-map-pin mr-2"></i>
                          {country.name}
                        </a>
                        <hr className="divider" />
                      </li>
                    )) : <li className="ml-3">No countries matched</li>}
                  </ul>
                </div>
                <div className="mt-4">
                  <h2>Cities</h2>
                  <ul className="no-bullets-list">
                    {cities.length ? cities.map((city) => (
                      <li key={`city-${city.id}`}>
                        <a href={`/cities/${city.id}`} className="dropdown-item">
                          <i className="fa fa-map-pin mr-2"></i>
                          {city.name}
                        </a>
                        <hr className="divider" />
                      </li>
                    )) : <li className="ml-3">No cities matched</li>}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationSearchPage;
