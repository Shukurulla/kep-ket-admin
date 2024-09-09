import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";
axios.interceptors.request.use((option) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  option.headers.Authorization = `Bearer ${token}`;
  return option;
});
export default axios;
