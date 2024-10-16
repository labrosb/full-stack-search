import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCityById, QueryError } from '../../utils/fetch';

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
    return(
      <div className="container">
        <div className="box">
          <h4 className="text-center">City not found!</h4>
        </div>
      </div>
    );
  };

  if (finishedFetching && !city.name) {
    return(
      <div className="container">
        <div className="box">
          <h4 className="text-center">Unexpected Error</h4>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="box">
        <h2>{city.name}</h2>
      </div>
    </div>
  );
}

export default CityPage;
