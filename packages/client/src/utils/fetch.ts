import { getCodeSandboxHost } from "@codesandbox/utils";

// TODO: use env variables
const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001'

export const QueryError = (error: unknown) => error as Error & { status?: number };

// Fetches multiSearch results, returning hotels, countries and cities
export const MultiSearch = async (searchTerm: string): Promise<SearchResults> => {
  const response = await fetch(`${API_URL}/multi-search?searchTerm=${searchTerm}`);
  const status = response.status;
  if (!response.ok) {
    const errorMsg = `Error ${status}, Failed to retrieve results`;
    console.error(errorMsg);
    return Promise.reject({ status, message: errorMsg });
  }

  const results: SearchResults = await response.json();

  return results;
};

// Fetches a hotel by ID
export const fetchHotelById = async (id: string): Promise<Hotel> => {
  const response = await fetch(`${API_URL}/hotels/${id}`);
  const status = response.status;
  if (!response.ok) {
    if (status === 404) {
      console.error('Error 404, Hotel not found');
      return Promise.reject({ status: 404, message: 'Hotel not found' });
    }

    const errorMsg = `Error ${status}, Failed to fetch hotel`;
    console.error(errorMsg);
    return Promise.reject({ status, message: errorMsg });
  }

  const hotel: Hotel = await response.json();
  return hotel;
};

// Fetches a country by ISO code
export const fetchCountryByIso = async (iso: string): Promise<Country> => {
  const response = await fetch(`${API_URL}/countries/${iso}`);
  const status = response.status;
  if (!response.ok) {
    if (status === 404) {
      console.error('Error 404, Country not found');
      return Promise.reject({ status: 404, message: 'Country not found' });
    }

    const errorMsg = `Error ${status}, Failed to fetch country`;
    console.error(errorMsg);
    return Promise.reject({ status, message: errorMsg });
  }

  const country: Country = await response.json();
  return country;
};

// Fetches a city by ID
export const fetchCityById = async (iso: string): Promise<City> => {
  const response = await fetch(`${API_URL}/cities/${iso}`);
  const status = response.status;
  if (!response.ok) {
    if (status === 404) {
      console.error('Error 404, City not found');
      return Promise.reject({ status: 404, message: 'City not found' });
    }

    const errorMsg = `Error ${status}, Failed to fetch city`;
    console.error(errorMsg);
    return Promise.reject({ status, message:errorMsg });
  }

  const city: City = await response.json();
  return city;
};


