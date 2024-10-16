import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCityById, QueryError } from '../../utils/fetch';
import InfoBox from '../../components/infoBox';

const CityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [city, setCity] = useState<City>({} as City);
  const [notFound, setNotFound] = useState(false);
  const [finishedFetching, setFinishedFetching] = useState(false);

  useEffect(() => {
    async function getcity() {
      if (!id) return;
      try {
        const cityRes = await fetchCityById(id);
        setCity(cityRes);
      } catch (error) {
        const queryError = QueryError(error);
        if (queryError?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setFinishedFetching(true);
      }
    }
    getcity();
  }, [id]);

  if (notFound) {
    return <InfoBox label="City not found!" />;
  }

  if (finishedFetching && !city.name) {
    return <InfoBox label="Unexpected Error!" />;
  }

  return (
    <div className="container">
      <div className="box">
        <h2>{city.name}</h2>
      </div>
    </div>
  );
}

export default CityPage;
