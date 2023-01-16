import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:4000/api/common/";
// const API_URL = "https://bill-factor-final.herokuapp.com/api/common/";
const API_URL = "https://billapi.billfactor.xyz/api/common/";

//////////////////// BIll ///////////////////////
const createBill = (bill) => {
  return axios
    .post(API_URL + "bill/createBill", bill, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getAllBill = () => {
  return axios
    .get(API_URL + `bill`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getMonthlyBill = ({ month, year }) => {
  return axios
    .get(API_URL + `bill/${month}/${year}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getPayableRenters = ({ month, year }) => {
  return axios
    .get(API_URL + `payable/${month}/${year}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const removeBill = (_id) => {
  return axios.delete(API_URL + `bill/${_id}`, {
    headers: authHeader(),
  });
};

//////////////////// TempBIll ///////////////////////

const createTempBill = (tempBill) => {
  return axios
    .post(API_URL + "bill/tempbill/create", tempBill, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getTempBill = (renterId) => {
  return axios
    .get(API_URL + `bill/tempbill/${renterId}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getAllTempBills = () => {
  return axios
    .get(API_URL + `bill/tempbill`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateTempBill = (updatedData) => {
  return axios
    .post(API_URL + "/bill/tempbill/updateTemp", updatedData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const mod_manCommonService = {
  //////////////////// BIll ///////////////////////
  createBill,
  getAllBill,
  getMonthlyBill,
  getPayableRenters,
  removeBill,
  //////////////////// TempBIll ///////////////////////
  getTempBill,
  getAllTempBills,
  createTempBill,
  updateTempBill,
};

export default mod_manCommonService;
