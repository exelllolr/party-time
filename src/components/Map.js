import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Map = ({ places }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {places.map(place => (
        <Marker key={place.id} position={[place.coordinates.lat, place.coordinates.lon]}>
          <Popup>{place.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;