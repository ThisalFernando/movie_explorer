import axios from "axios";

const API_URL = "https://movieexplorerbackend-production.up.railway.app/api"; 

// Login the user
export const loginUser = async (formData) => {
  return await axios.post(`${API_URL}/auth/login`, formData);
};

// Register the user
export const registerUser = async (formData) => {
  return await axios.post(`${API_URL}/auth/register`, formData);
};