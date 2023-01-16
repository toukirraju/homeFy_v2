import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api/post/";
// const API_URL = "https://bill-factor-final.herokuapp.com/api/";
// const API_URL = "https://billapi.billfactor.xyz/api/";

/////////////
const createPost = (post) => {
  return axios
    .post(API_URL + "create", post, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////

const getUserPost = () => {
  return axios
    .get(API_URL + "userposts", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
/////////////

const updatePost = ({ _id, post }) => {
  return axios
    .put(API_URL + _id, post, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

/////////////
const hidePost = (id) => {
  return axios.put(API_URL + id, { headers: authHeader() }).then((response) => {
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

const postService = {
  createPost,
  getUserPost,
  updatePost,
  hidePost,
  updateApartment,
  removeApartment,
};

export default postService;
