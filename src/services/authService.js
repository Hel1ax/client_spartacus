import axios from 'axios';

const API_URL = 'https://server-spartacus.onrender.com/api/users/';

export const register = async (userData) => {
  try {
    console.log(1235)
    const response = await axios.post(`${API_URL}register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (userData) => {
  try {
    console.log(1235)
    const response = await axios.post(`${API_URL}login`, userData, {
        headers: {
          'Content-Type': 'application/json',
        }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
