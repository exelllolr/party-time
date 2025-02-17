import React, { useState, useEffect } from 'react';
import { getPopularPlaces } from '../api/places';
import Navbar from '../components/Navbar';
import PopularPlaces from '../components/PopularPlaces';

const Home = () => {
  const [places, setPlaces] = useState([]);
  
  useEffect(() => {
    const fetchPlaces = async () => {
      const data = await getPopularPlaces();
      setPlaces(data);
    };
    fetchPlaces();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h2 className="text-2xl mb-4">Popular Places</h2>
        <PopularPlaces places={places} />
      </div>
    </div>
  );
};

export default Home;
