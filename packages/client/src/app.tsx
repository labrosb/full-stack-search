import { useState, type ChangeEvent } from 'react';
import { getCodeSandboxHost } from "@codesandbox/utils";

type Hotel = { id: string, name: string; };
type Country = { id: string, isoCode: string, name: string,  };
type City = { id: string, name: string };

type SearchResults = {
  hotels: Hotel[],
  countries: Country[],
  cities: City[],
}

const codeSandboxHost = getCodeSandboxHost(3001)
const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001'

const fetchData = async (value: string) => {
  const response = await fetch(`${API_URL}/multi-search?q=${value}`);
  const { hotels, countries, cities }: SearchResults = await response.json();
  return { hotels, countries, cities };
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  const resetValues = () => {
    setSearchTerm('');
    setHotels([]);
    setCities([]);
    setCountries([]);
    setShowClearBtn(false);
  };

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ;
    setSearchTerm(value);
    if (value === '') {
      resetValues();
      return;
    }

    try {
      const searchResults = await fetchData(event.target.value);
      setShowClearBtn(true);
      setHotels(searchResults.hotels);
      setCities(searchResults.cities);
      setCountries(searchResults.countries);
    } catch (err) {
      console.error(err);
      resetValues();
    }
  };

  const handleButtonXClick = () => {
    resetValues();
  };

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
