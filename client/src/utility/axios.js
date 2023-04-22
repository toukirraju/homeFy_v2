import axios from "axios";

const axiosInstance = axios.create({
  baseUrl: "https://api.h0mify.com/api/v1",
  // url: "https://api.h0mify.com/api/v1",
});

export default axiosInstance;
