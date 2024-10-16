import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountryByIso, QueryError } from '../../utils/fetch';
import InfoBox from '../../components/infoBox';

const CountryPage: React.FC = () => {
  const { isoCode } = useParams<{ isoCode: string }>();

  const [country, setCountry] = useState<Country>({} as Country);
  const [notFound, setNotFound] = useState(false);
  const [finishedFetching, setFinishedFetching] = useState(false);

  useEffect(() => {
    async function getCountry() {
      if (!isoCode) return;
      try {
        const countryRes = await fetchCountryByIso(isoCode);
        setCountry(countryRes);
      } catch (error) {
        const queryError = QueryError(error);
        if (queryError?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setFinishedFetching(true);
      }
    }
    getCountry();
  }, [isoCode]);

  if (notFound) {
    return <InfoBox label="Country not found!" />;
  }

  if (finishedFetching && !country.name) {
    return <InfoBox label="Unexpected Error!" />;
  }

  return (
    <div className="container">
      <div className="box">
        <h2>{country.name}</h2>
        <p className="pt-3 pl-1">ISO code: {isoCode}</p>
      </div>
    </div>
  );
}

export default CountryPage;
