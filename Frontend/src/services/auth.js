import API from './api';

export async function register(data) {
  const response = await API.post('/register', data);
  return response.data;
}

export async function login(data) {
  const response = await API.post('/login', data);
  return response.data;
}