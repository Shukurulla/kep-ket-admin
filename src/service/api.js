import axios from "axios";

axios.defaults.baseURL = "http://45.134.39.117:1234/api/";
axios.defaults.timeout = 30000;
axios.interceptors.request.use((option) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  option.headers.Authorization = `Bearer ${token}`;
  return option;
});
export default axios;
