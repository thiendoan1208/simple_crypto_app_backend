const axios = require("axios");
const { config } = require("dotenv");
config();

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000, // tăng chút cho chắc
  headers: {
    "x-rapidapi-host": process.env.RAPIDAPI_HOST,
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

module.exports = instance;
