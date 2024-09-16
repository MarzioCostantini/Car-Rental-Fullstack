import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LatLngExpression, Icon } from 'leaflet';  // Icon direkt von Leaflet importieren
import Loader from '../Loader/Loader';

// Manuelles Setzen der Icon-Bilder (Standard-Leaflet-Icons)
const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

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
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();

    // const apiKey = import.meta.env.VITE_POSITIONSTACK_API_KEY;
    const apiKey = "909aaea70fc4a7fbbd8d639e476f27ce";

    // Koordinaten Funktion
    useEffect(() => {
        async function getCoordinates(cityName: string): Promise<Icoords> {
            try {
                const response = await fetch(`https://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(cityName)}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch coordinates for ${cityName}`);
                }

                const data = await response.json();

                if (data && data.data.length > 0) {
                    const location = data.data[0];
                    return { lat: Number(location.latitude), lng: Number(location.longitude), name: cityName };
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

    // Zoom Level der Karte
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
                <Marker key={index} position={[coord.lat, coord.lng]} icon={customIcon}>
                    <Popup>{coord.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapWithMarkers;
