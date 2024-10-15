import axios from "axios";

axios.defaults.baseURL = "kep-ket-api.vercel.app/api";
axios.interceptors.request.use((option) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  option.headers.Authorization = `Bearer ${token}`;
  return option;
});
export default axios;
