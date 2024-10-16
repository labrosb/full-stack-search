import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHotelById, QueryError } from '../../utils/fetch';

const HotelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [hotel, setHotel] = useState<Hotel>({} as Hotel);
  const [notFound, setNotFound] = useState(false);
  const [finishedFetching, setFinishedFetching] = useState(false);

  useEffect(() => {
    async function fetchHotel() {
      if (!id) return;
      try {
        const hotelRes = await fetchHotelById(id);
        setHotel(hotelRes);
      } catch (error) {
        const queryError = QueryError(error);
        if (queryError?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setFinishedFetching(true);
      }
    }
    fetchHotel();
  }, [id]);

  if (notFound) {
    return(
      <div className="container">
        <div className="box">
          <h4 className="text-center">Hotel not found!</h4>
        </div>
      </div>
    );
  };

  if (finishedFetching && !hotel.name) {
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
        <h2>{hotel.name}</h2>
        <div className="pt-3 pl-1">
          {!!hotel.chain && <p>{hotel.chain}</p>}
          <p>
            Address: {hotel.addressLine1} {!!hotel.addressLine2 && `- ${hotel.chain}`}
            {!!hotel.zipCode && `, ${hotel.zipCode}`}
          </p>
            {!!hotel.state && <p>State: {hotel.state}</p>}
          <p>City: {hotel.city}</p>
          <p>Country: {hotel.country}</p>
          <p>Rating: {hotel.starRating} / 5</p>
        </div>
      </div>
    </div>
  );
}

export default HotelPage;
