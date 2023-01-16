import axios from "axios";
import authHeader from "./auth-header";

// const API_URL ="http://localhost:4000/api/"
// const API_URL = "https://bill-factor-final.herokuapp.com/api/";
const API_URL = "https://billapi.billfactor.xyz/api/";

/////////////
const createFloors = (floors) => {
  return axios
    .post(API_URL + "createfloors", floors, { headers: authHeader() })
    .then((response) => {
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

const getApartments = () => {
  return axios
    .get(API_URL + `apartments`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////
const updateApartment = (updatedData) => {
  return axios
    .post(API_URL + "updateApartment", updatedData, { headers: authHeader() })
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

//////////////////////////////////////////      Renter      //////////////////////////////////////////

const assignRenter = (assignedData) => {
  return axios
    .post(API_URL + "assign", assignedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const unAssignRenter = (unAssignedData) => {
  return axios
    .post(API_URL + "removeAssigned", unAssignedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

//////////////////////////////////////////      Renter      //////////////////////////////////////////

const createRenter = (renter) => {
  return axios
    .post(API_URL + "renter/createRenter", renter, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getAllRenter = () => {
  return axios
    .get(API_URL + `renter`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateRenter = (updatedData) => {
  return axios
    .post(API_URL + "renter/updateRenter", updatedData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const removeRenter = (renterId) => {
  return axios.delete(API_URL + `renter/${renterId}`, {
    headers: authHeader(),
  });
};

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

const moderatorService = {
  ////////Apartement////////
  createFloors,
  addApartment,
  getApartments,
  updateApartment,
  removeApartment,
  ////////Renter////////
  createRenter,
  getAllRenter,
  updateRenter,
  removeRenter,
  ////////Assign/////////
  assignRenter,
  unAssignRenter,
  ////////Role/////////
  getSub_Man,
  getRoledMan,
  updateRole,
  removeRole,
};

export default moderatorService;
