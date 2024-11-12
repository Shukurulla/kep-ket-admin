import axios from "axios";

axios.defaults.baseURL = "https://kep-ket-api.vercel.app/api";
axios.defaults.timeout = 30000;
axios.interceptors.request.use((option) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  option.headers.Authorization = `Bearer ${token}`;
  return option;
});
export default axios;
