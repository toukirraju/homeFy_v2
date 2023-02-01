import axios from "axios";

const API_URL = "http://localhost:4040/auth/admin/";
// const API_URL = "https://billapi.billfactor.xyz/api/";

const register = (formData) => {
  return axios.post(API_URL + "register", formData).then((response) => {
    if (response.data) {
      if (response.data.user.role) {
        localStorage.setItem("profile", JSON.stringify(response.data));
      } else {
        // redirect:
        window.location.replace("http://localhost:3000");
      }
    }
    return response.data;
  });
};

/////////////
const login = (formData) => {
  return axios.post(API_URL + "login", formData).then((response) => {
    if (response.data) {
      if (response.data.user.roles) {
        localStorage.setItem("profile", JSON.stringify(response.data));
      } else {
        // redirect:
        window.location.replace("http://localhost:3000");
      }
    }
    return response.data;
  });
};
/////////////

/////////////

const logout = () => {
  localStorage.clear();
  window.location.reload();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
