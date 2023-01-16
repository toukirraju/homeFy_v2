import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api/apartment/";
// const API_URL = "https://bill-factor-final.herokuapp.com/api/";
// const API_URL = "https://billapi.billfactor.xyz/api/";

/////////////
const createApartments = (numOfapartment) => {
  return axios
    .post(API_URL + "create", numOfapartment, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////

const getApartments = () => {
  return axios.get(API_URL, { headers: authHeader() }).then((response) => {
    return response.data;
  });
};
/////////////

/////////////
const addApartment = (apartData) => {
  return axios
    .post(API_URL + "addApartment", apartData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////
const updateApartment = (updatedData) => {
  return axios
    .post(API_URL + "update", updatedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
/////////////

/////////////
const removeApartment = (apartmentId) => {
  return axios.delete(API_URL + `${apartmentId}`, { headers: authHeader() });
};
/////////////

//////////////////////////////////////////     Role Assign     //////////////////////////////////////////

const getSub_Man = (srcId) => {
  return axios
    .get(API_URL + srcId, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getRoledMan = () => {
  return axios
    .get(API_URL + `getRoledMan`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateRole = ({ _id, assignData }) => {
  return axios
    .put(API_URL + _id, assignData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const removeRole = (_id) => {
  return axios.get(API_URL + `role/${_id}`, {
    headers: authHeader(),
  });
};

const apartmentService = {
  ////////Apartement////////
  createApartments,
  addApartment,
  getApartments,
  updateApartment,
  removeApartment,
  ////////Role/////////
  getSub_Man,
  getRoledMan,
  updateRole,
  removeRole,
};

export default apartmentService;
