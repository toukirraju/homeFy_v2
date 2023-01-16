import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api/house/";

const getHouseInfo = (formData) => {
  return axios
    .get(API_URL + `info/${formData._id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateHouseInfo = (formData) => {
  return axios
    .post(API_URL + "info", formData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const houseService = {
  getHouseInfo,
  updateHouseInfo,
};

export default houseService;
