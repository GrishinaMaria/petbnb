import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3100/',
});

let accessToken = '';

function setAccessToken(newToken: string) {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      const response = await axios('/api/tokens/refresh');
      accessToken = response.data.accessToken;
      prevRequest.sent = true;
      prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);


export { setAccessToken };

export default axiosInstance;
