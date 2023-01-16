import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api/renter/";
// const API_URL = "https://bill-factor-final.herokuapp.com/api/";
// const API_URL = "https://billapi.billfactor.xyz/api/";

//////////////////////////////////////////      Renter      //////////////////////////////////////////

const createRenter = (formData) => {
  return axios
    .post(API_URL + "create", formData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getAllRenter = () => {
  return axios
    .get(API_URL + `getAll`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const findRenter = (searchId) => {
  return axios
    .get(API_URL + `find/${searchId}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateRenter = (formData) => {
  return axios
    .put(API_URL + `update/${formData._id}`, formData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const removeRenter = (removeData) => {
  return axios
    .put(API_URL + `remove/${removeData.renterId}`, removeData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const deleteRenter = (renterId) => {
  return axios.delete(API_URL + `renter/${renterId}`, {
    headers: authHeader(),
  });
};

//////////////////////////////////////////    assign/unassign  Renter      //////////////////////////////////////////

const assignRenter = (assignedData) => {
  return axios
    .post(API_URL + "assign", assignedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const unAssignRenter = (unAssignedData) => {
  return axios
    .post(API_URL + "unassign", unAssignedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
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

const renterService = {
  ////////Renter////////
  createRenter,
  getAllRenter,
  updateRenter,
  removeRenter,
  deleteRenter,
  findRenter,
  ////////Assign/////////
  assignRenter,
  unAssignRenter,
  ////////Role/////////
  getSub_Man,
  getRoledMan,
  updateRole,
  removeRole,
};

export default renterService;
