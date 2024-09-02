import axios from 'axios';
import { useEffect } from 'react';

interface CityLocation {
  city: string;
  lat: number;
  lng: number;
}

interface GetLatLonProps {
  cities: string[];
  onLocationsFetched: (locations: CityLocation[]) => void;
}

export const GetLatLon: React.FC<GetLatLonProps> = ({ cities, onLocationsFetched }) => {

  useEffect(() => {
    const fetchCoordinates = async () => {
      const promises = cities.map(city =>
        axios.get(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`)
          .then(response => {
            if (response.data.length > 0) {
              const { lat, lon } = response.data[0];
              return { city, lat: parseFloat(lat), lng: parseFloat(lon) };
            }
            return null;
          })
      );
      const results = await Promise.all(promises);
      onLocationsFetched(results.filter(result => result !== null) as CityLocation[]);
    };

    if (cities.length > 0) {
      fetchCoordinates();
    }
  }, []);

  return null; 
};
