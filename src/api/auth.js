import axios from 'axios';

export const registerUser = async (data) => {
  try {
    const response = await axios.post('/api/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false };
  }
};
export const loginUser = async (data) => {
    try {
      const response = await axios.post('/api/auth/login', data);
      return response.data;
    } catch (error) {
      console.error('Error logging in user:', error);
      return { success: false };
    }
  };
  