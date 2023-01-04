import Axios from 'axios';

const AxiosInstance = Axios.create({
  baseURL: 'https://graph.facebook.com/v15.0',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { AxiosInstance };
