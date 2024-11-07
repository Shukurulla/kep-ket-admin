import toast from "react-hot-toast";
import { showToast } from "../slice/ui";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
} from "../slice/user.slice";
import axios from "./api";
const token = localStorage.getItem("token");
const id = localStorage.getItem("userId");

const UserService = {
  async getUser(dispatch, navigate) {
    dispatch(getUserStart());
    try {
      const { data } = await axios.get(`/restaurants/${id}`);
      dispatch(getUserSuccess(data.restaurant));
      if (data) {
        if (window.location.pathname === "/login") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.restaurant._id);
          navigate("/home");
        }
      }

      return data;
    } catch ({ response }) {
      localStorage.clear();
      dispatch(getUserFailure());
    }
  },
  async postUser(dispatch, user, navigate) {
    dispatch(getUserStart());
    try {
      const { data } = await axios.post("/restaurants", user);

      dispatch(getUserSuccess(data.restaurant));
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.restaurant._id);
        navigate("/home");
      }
      toast.success("Foydalanuvchi muaffaqiyatli qoshildi");
    } catch (error) {
      dispatch(getUserFailure());

      console.log(error);
    }
  },
  async loginUser(dispatch, user, navigate) {
    dispatch(getUserStart());
    try {
      const { data } = await axios.post("/restaurants/login", user);
      console.log(data);

      if (data?.token) {
        dispatch(getUserSuccess(data.user));
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.restaurant._id);
        navigate("/home");
        window.location.reload();
        toast.success("Profilga muaffaqiyatli kirildi");
      }
    } catch (error) {
      dispatch(getUserFailure(error));
      console.log(error);
    }
  },
  async loginById(dispatch, id, navigate) {
    dispatch(getUserStart());
    try {
      const { data } = await axios.get(`/restaurants/${id}`);

      if (data) {
        dispatch(getUserSuccess(data.restaurant));

        navigate("/home");
        dispatch(
          showToast({
            status: "success",
            alert: "Profilga muaffaqiyatli kirildi",
          })
        );
      } else {
        dispatch(getUserFailure(data.error));
      }
    } catch (error) {
      console.log(error);
    }
  },
  async test(dispatch, val) {
    dispatch(getUserStart());
    try {
      const { data } = await axios.post("/test", val, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getUserSuccess(data.user));
    } catch (error) {
      console.log(error);
      dispatch(getUserFailure());
    }
  },
  async settings(dispatch, value, userId) {
    dispatch(getUserStart());
    try {
      const { data } = await axios.put(`/restaurants/${userId}`, value);
      dispatch(getUserSuccess(data));
      toast.success("Profil muaffaqiyatli ozgartirildi!!!");
    } catch (error) {
      console.log(error);
      dispatch(getUserFailure());
    }
  },
};

export default UserService;
