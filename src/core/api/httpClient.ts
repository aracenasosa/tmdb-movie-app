import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const accessToken = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;

export const httpClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  timeout: 10000,
});

httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);
