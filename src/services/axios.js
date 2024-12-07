import axios from 'axios';

// Настройка базового URL для всех запросов
const instance = axios.create({
  baseURL: 'https://server-spartacus.onrender.com/api/', // или URL вашего бекенда
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
