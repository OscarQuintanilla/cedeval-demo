import Axios from 'axios';

export const axios = Axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_CEDEVAL_SERVICES_URL
      : undefined,
  headers: {
    Authorization: localStorage.getItem('token')
      ? `Bearer ${localStorage.getItem('token')}`
      : '',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: false,
});
