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
  request.headers['Authorization'] = 'JWT';
  return request;
});

export default http;
