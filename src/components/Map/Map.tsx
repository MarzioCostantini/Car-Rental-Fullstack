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




    console.log(coordinates);


    // holt location
    const location = useLocation()


    // Koordinaten Funktion
    useEffect(() => {
        async function getCoordinates(cityName: string): Promise<Icoords> {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const location = data[0];
                return { lat: parseFloat(location.lat), lng: parseFloat(location.lon), name: cityName };
            } else {
                throw new Error('Geocoding nicht gefunden');
            }
        }

        const fetchAllCoordinates = async () => {
            const allCoords = await Promise.all(stadt.map(city => getCoordinates(city)));
            setCoordinates(allCoords);
        };

        fetchAllCoordinates().catch(error => {
            console.error(error);
        });

    }, [stadt]);

    if (coordinates.length === 0) {
        return <Loader />;
    }

    // Zoom Level der Karte anahand von
    const center = location.pathname === "/my-bookings"
        ? [coordinates[0].lat, coordinates[0].lng]
        : [51.1657, 10.4515];

    return (
        <MapContainer
            center={center as LatLngExpression}
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
