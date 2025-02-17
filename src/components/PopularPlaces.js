import React from 'react';

const PopularPlaces = ({ places }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {places.map(place => (
        <div key={place.id} className="border p-4 rounded-lg">
          <h3 className="text-xl">{place.name}</h3>
          <p>{place.address}</p>
        </div>
      ))}
    </div>
  );
};

export default PopularPlaces;
