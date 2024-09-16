import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LatLngExpression } from 'leaflet';
import Loader from '../Loader/Loader';

interface ICity {
    stadt: string[];
}

interface Icoords {
    lat: number;
    lng: number;
    name: string;
}

const MapWithMarkers: React.FC<ICity> = ({ stadt }) => {
    const [coordinates, setCoordinates] = useState<Icoords[]>([]);
    const [error, setError] = useState<string | null>(null); // Fehlerzustand hinzufügen
    const location = useLocation();

    const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY


    console.log("key", apiKey);

    // Koordinaten Funktion
    useEffect(() => {
        async function getCoordinates(cityName: string): Promise<Icoords> {
            try {
                const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch coordinates for ${cityName}`);
                }

                const data = await response.json();

                if (data && data.length > 0) {
                    const location = data[0];
                    return { lat: location.lat, lng: location.lon, name: cityName };
                } else {
                    throw new Error(`No results found for ${cityName}`);
                }
            } catch (error: any) {
                console.error(`Error fetching data for ${cityName}:`, error.message);
                setError(error.message);
                throw error;
            }
        }

        const fetchAllCoordinates = async () => {
            try {
                const allCoords = await Promise.all(stadt.map(city => getCoordinates(city)));
                setCoordinates(allCoords);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllCoordinates();
    }, [stadt]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (coordinates.length === 0) {
        return <Loader />;
    }

    // Zoom Level der Karte anhand von Koordinaten
    const center: LatLngExpression = location.pathname === "/my-bookings"
        ? [coordinates[0].lat, coordinates[0].lng]
        : [51.1657, 10.4515]; // Standard für Deutschland

    return (
        <MapContainer
            center={center}
            zoom={6}
            style={{ width: '100%', height: '400px' }}
            className='map'
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {coordinates.map((coord, index) => (
                <Marker key={index} position={[coord.lat, coord.lng]}>
                    <Popup>{coord.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapWithMarkers;
