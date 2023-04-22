import axios from "axios";
import axiosInstance from "../../../utility/axios";

const URL = "https://api.h0mify.com/api/v1/post";

// export const getPost = async () => {
//   const response = await axiosInstance.get(
//     URL +
//       `/timeline/posts?_page=1&limit=${process.env.REACT_APP_POSTS_PER_PAGE}`
//   );

//   return response.data;
// };

export const getPost = async () => {
  const response = await axios.get(
    URL +
      `/timeline/posts?_page=1&limit=${process.env.REACT_APP_POSTS_PER_PAGE}`
  );

  return response.data;
};

export const getMorePost = async (page) => {
  const response = await axios.get(
    URL +
      `/timeline/posts?_page=${page}&limit=${process.env.REACT_APP_POSTS_PER_PAGE}`
  );

  return response.data;
};

export const getFilteredPost = async ({ budget, rooms, homeId }) => {
  // console.log(homeId);
  let queryString;
  if (budget && rooms) {
    queryString = `&budget=${budget}&rooms=${rooms}`;
  } else if (budget) {
    queryString = `&budget=${budget}`;
  } else if (rooms) {
    queryString = `&rooms=${rooms}`;
  } else if (homeId) {
    queryString = `&homeId=${homeId}`;
  }
  const response = await axios.get(
    URL +
      `/timeline/posts?_page=1&limit=${process.env.REACT_APP_POSTS_PER_PAGE}${
        queryString ? queryString : ""
      }`
  );
  return response.data;
};
