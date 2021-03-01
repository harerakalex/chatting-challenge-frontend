import axios from 'axios';

const { REACT_APP_BACKEND_URL } = process.env;
const http = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  headers: {
    Authorization: 'JWT ',
    'access-control-allow-origin': '*',
    'content-Type': 'application/json',
  },
});

http.interceptors.request.use(async (request) => {
  const { token } = localStorage;
  request.headers['Authorization'] = token;
  return request;
});

export default http;
