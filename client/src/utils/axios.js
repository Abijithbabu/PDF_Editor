import axios from "axios";
import notify from "./notification";

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
  const message = response?.data?.message
  console.warn(message)
  notify({ message: message })
  return response;
}, function (error) {
  const errorMessage = error?.response?.data?.message || error.message
  console.error('Error ' + errorMessage)
  notify({ message: errorMessage, title: 'Error !', type: 'danger' })
  return Promise.reject(error);
});