import axios from "axios";
import authHeader from "./auth-header";

// const API_URL ="http://localhost:4000/api/common/dashboard/"
// const API_URL = "https://bill-factor-final.herokuapp.com/api/common/dashboard/";
const API_URL = "https://billapi.billfactor.xyz/api/common/dashboard/";

//////////////////// Dashboard ///////////////////////

const getApartmentWidget = () => {
  return axios
    .get(API_URL + `apartmentWidget`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getRenterWidget = () => {
  return axios
    .get(API_URL + `renterWidget`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getBillWidget = () => {
  return axios
    .get(API_URL + `billWidget`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getYearlyBill = (year) => {
  return axios
    .get(API_URL + year, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const dashboardService = {
  //////////////////// Dashboard ///////////////////////
  getApartmentWidget,
  getRenterWidget,
  getBillWidget,
  getYearlyBill,
};

export default dashboardService;
