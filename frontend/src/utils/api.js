import axios from 'axios';

// Membuat server pusat untuk frontend berbicara ke backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Alamat backend Express kamu
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;