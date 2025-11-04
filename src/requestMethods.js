// File: src/requestMethods.js
import axios from "axios";

const BASE_URL = "https://theknot-30278e2ff419.herokuapp.com/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// Create instance without token
export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Add token interceptor to get fresh token on each request
userRequest.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = user && JSON.parse(user).currentUser;
    const token = currentUser?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
