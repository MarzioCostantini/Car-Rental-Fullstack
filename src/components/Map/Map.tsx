import React, { useState } from 'react';
import { GetLatLon } from './getLatLon.ts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Imap {
    cities: string[]
}
const Maps: React.FC<Imap> = ({ cities }) => {
    const [locations, setLocations] = useState<CityLocation[]>([]);


    console.log(cities);

    const handleLocationsFetched = (locations: CityLocation[]) => {
        setLocations(locations);
    };

    return (
        <div>

            <GetLatLon cities={cities} onLocationsFetched={handleLocationsFetched} />
            <MapContainer center={[51.165, 10.451]} zoom={5} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map((location, index) => (
                    <Marker key={index} position={[location.lat, location.lng]}>
                        <Popup>{location.city}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Maps;
