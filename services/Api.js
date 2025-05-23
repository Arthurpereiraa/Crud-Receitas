
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://receitas-app.onrender.com',
});

export default api;
