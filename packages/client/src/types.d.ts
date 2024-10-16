type HotelResult = {
  id: string;
  name: string;
};

type CountryResult = {
  id: string;
  isoCode: string;
  name: string;
};

type CityResult = {
  id: string;
  name: string;
};

type SearchResults = {
  hotels: HotelResult[];
  countries: CountryResult[];
  cities: CityResult[];
};

type Hotel = {
  name: string;
  chain: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  starRating: string;
};

type Country = {
  name: string;
  isoCode: string;
};


type City = {
  name: string;
  isoCode: string;
};
