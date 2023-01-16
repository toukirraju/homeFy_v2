import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api/bill/";

const getMonthlyBill = ({ month, year }) => {
  return axios
    .get(API_URL + `${month}/${year}`, { headers: authHeader() })
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

const getTempBills = () => {
  return axios
    .get(API_URL + `temp`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getRenterTempBIll = (renterId) => {
  return axios
    .get(API_URL + `/temp/r/${renterId}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const createBill = (billData) => {
  return axios
    .post(API_URL + "create", billData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const createTempBill = (tempBillData) => {
  return axios
    .post(API_URL + "temp/create", tempBillData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const updateTempBill = (tempBillData) => {
  return axios
    .post(API_URL + "temp/update", tempBillData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const removeBill = (id) => {
  return axios
    .delete(API_URL + `delete/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const removeTempBill = (id) => {
  return axios
    .delete(API_URL + `temp/delete/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const billService = {
  getPayableRenters,
  getMonthlyBill,
  getTempBills,
  getRenterTempBIll,
  createBill,
  createTempBill,
  updateTempBill,
  removeBill,
  removeTempBill,
};

export default billService;
