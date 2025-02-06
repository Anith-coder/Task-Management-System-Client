// src/services/taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/task'; // Base URL of your Spring Boot backend

// Get all tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a task by ID
export const getTaskById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

// Update an existing task
export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Filter tasks by status
export const filterTasksByStatus = async (status) => {
  const response = await axios.get(`${API_URL}/filter?status=${status}`);
  return response.data;
};

// Search tasks by title
export const searchTasksByTitle = async (title) => {
  const response = await axios.get(`${API_URL}/search?title=${title}`);
  return response.data;
};
