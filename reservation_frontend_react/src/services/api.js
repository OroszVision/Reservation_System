import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1';

const getHeaders = () => {
  const accessToken = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
};

export const fetchReservations = async () => {
  try {
    const response = await axios.get(`${baseUrl}/reservation/admin/all`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAdditionals = async () => {
  try {
    const response = await axios.get(`${baseUrl}/additional/sortedByName`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAvailableAdditionals = async () => {
  try {
    const response = await axios.get(`${baseUrl}/additional/findAllAvailable`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReservation = async (reservation) => {
  try {
    const response = await axios.post(`${baseUrl}/reservation/create`, reservation, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};

export const getReservationById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/reservation/${id}`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateReservation = async (id, reservation) => {
  try {
    const response = await axios.put(`${baseUrl}/reservation/${id}`, reservation, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw error;
  }
};

export const getUsers = async () => {
  const headers = getHeaders();
  const response = await axios.get(`${baseUrl}/user`, { headers });
  return response.data;
};

export const promoteUser = async (userId) => {
  const headers = getHeaders();
  const response = await axios.post(`${baseUrl}/user/${userId}/promote`, null, { headers });
  return response.data;
};

export const demoteUser = async (userId) => {
  const headers = getHeaders();
  const response = await axios.post(`${baseUrl}/user/${userId}/demote`, null, { headers });
  return response.data;
};