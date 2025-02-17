import axios from 'axios';

export const getPopularPlaces = async () => {
  try {
    const response = await axios.get('/api/places/popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular places:', error);
    return [];
  }
};