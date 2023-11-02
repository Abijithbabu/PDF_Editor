import axios from "axios";

const baseURL = `${import.meta.env.VITE_SERVER_URL}/api`

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export default Axios

Axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    console.warn(error)
    return Promise.reject(error);
  });

Axios.interceptors.response.use(function (response) {
console.warn(response?.data?.message)
  return response;
}, function (error) {
    console.error(error?.response?.data?.message || error.message)
  return Promise.reject(error);
});