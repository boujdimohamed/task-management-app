import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api/api/v1/task', // Replace with your Spring Gateway base URL
});

export default api;