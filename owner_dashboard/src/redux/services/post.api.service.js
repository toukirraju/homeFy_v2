import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:4040/api/v1/post/";
// const API_URL = "https://bill-factor-final.herokuapp.com/api/";
const API_URL = "https://api.billfactor.xyz/api/v1/post/";

////////////////////// Create Post \\\\\\\\\\\\\\\\\\\\\\\
const createPost = (post) => {
  return axios
    .post(API_URL + "create", post, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
/////////////
////////////////////// Get Specific Houses Post \\\\\\\\\\\\\\\\\\\\\\\
const getSpecificHousePosts = () => {
  return axios
    .get(API_URL + "specificposts", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////
////////////////////// Delete Post \\\\\\\\\\\\\\\\\\\\\\\
const deletePost = (postId) => {
  return axios.delete(API_URL + `${postId}`, { headers: authHeader() });
};
/////////////
////////////////////// Post  Widget \\\\\\\\\\\\\\\\\\\\\\\
const postWidget = () => {
  return axios
    .get(API_URL + "postwidget", {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

/////////////

const postService = {
  createPost,
  getSpecificHousePosts,
  postWidget,
  deletePost,
};

export default postService;
