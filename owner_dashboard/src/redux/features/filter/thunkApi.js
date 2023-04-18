import authHeader from "../../../utility/auth-header";
import axiosInstance from "../../../utility/axios";

const URL = "/renter";
const URL2 = "/owner";

export const findRenter = async (searchId) => {
  const response = await axiosInstance.get(URL + `/find/${searchId}`, {
    headers: authHeader(),
  });

  return response.data;
};
////********* Search Manager ************\\\\
export const findManager = async (searchId) => {
  const response = await axiosInstance.get(URL2 + `/manager/${searchId}`, {
    headers: authHeader(),
  });

  return response.data;
};
