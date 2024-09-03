import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

interface ICity {
    stadt: string;
}

interface Icoords {
    lat: number;
    lng: number;
}

const MapWithMarkers: React.FC<ICity> = ({ stadt }) => {
    const [latLon, setLatLon] = useState<Icoords | null>(null);

    // ! Koordinaten funktion
    useEffect(() => {
        async function getCoordinates(cityName: string): Promise<Icoords> {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const location = data[0];
                return { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
            } else {
                throw new Error('Geocoding nicht gefunden');
            }
        }

        getCoordinates(stadt).then(coords => {
            setLatLon(coords);
        }).catch(error => {
            console.error(error);
        });

    }, [stadt]);

    if (!latLon) {
        return <div>Loading...</div>;
    }



    return (
        <MapContainer
            center={[latLon.lat, latLon.lng]}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            className='map'
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker position={[latLon.lat, latLon.lng]}>
                <Popup>{stadt}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapWithMarkers;
