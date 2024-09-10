import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error('VITE_API_URL is not defined in the environment variables');
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const getEmployees = async (page: number, limit: number) => {
  const response = await api.get(`/employees?page=${page}&limit=${limit}`);
  return response.data;
};

export const createEmployee = async (employeeData: { name: string; position: string }) => {
  const response = await api.post('/employees', employeeData);
  return response.data;
};

export const updateEmployee = async (id: number, employeeData: { name?: string; position?: string }) => {
  const response = await api.put(`/employees/${id}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (id: number) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};

export default api;