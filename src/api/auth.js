import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
};

export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
};

export const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

export const logoutUser = async () => {
    try {
        await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.error('Error logging out:', error);
    }
};

  