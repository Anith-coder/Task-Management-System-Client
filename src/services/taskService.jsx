import axios from 'axios';

const API_URL = 'http://localhost:8080/task'; 


export const getTasks = async (searchQuery='') => {
  const response = await axios.get(`${API_URL}?search=${searchQuery}`);
  return response.data;
};


export const getTaskById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};


export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};


export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData);
  return response.data;
};


export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};


export const filterTasksByStatus = async (status) => {
  const response = await axios.get(`${API_URL}/filter?status=${status}`);
  return response.data;
};


export const searchTasksByTitle = async (title) => {
  const response = await axios.get(`${API_URL}/search?title=${title}`);
  return response.data;
};
