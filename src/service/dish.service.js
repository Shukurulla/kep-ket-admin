import {
  getDishesFailure,
  getDishesStart,
  getDishesSuccess,
} from "../slice/dish.slice";
import { showToast } from "../slice/ui";
import axios from "./api";
const id = localStorage.getItem("userId");
const DishService = {
  async getDish(dispatch) {
    dispatch(getDishesStart());
    try {
      const { data } = await axios.get(`/dishes/${id}`);
      dispatch(getDishesSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getDishesFailure());
    }
  },
  async postDish(dispatch, value, navigate) {
    dispatch(getDishesStart());
    try {
      await axios.post(`/dishes/`, value);
      const { data } = await axios.get(`/dishes/${id}`);
      dispatch(getDishesSuccess(data));
      if (data) {
        navigate("/dish");
        dispatch(
          showToast({
            status: "success",
            alert: "Taom muaffaqiyatli qoshildi",
          })
        );
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      dispatch(getDishesFailure());
    }
  },
  async editDish(dispatch, categoryId, value, navigate) {
    dispatch(getDishesStart());
    try {
      await axios.put(`/dishes/${categoryId}`, value);
      const { data } = await axios.get(`/dishes/${id}`);
      dispatch(getDishesSuccess(data));
      if (data) {
        dispatch(
          showToast({
            status: "success",
            alert: "Taom muaffaqiyatli ozgartirildi",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(getDishesFailure());
    }
  },
  async deleteDish(dispatch, categoryId, value) {
    dispatch(getDishesStart());
    try {
      await axios.delete(`/dishes/${categoryId}`, value);
      const { data } = await axios.get(`/dishes/${id}`);
      dispatch(getDishesSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getDishesFailure());
    }
  },
  async getDishId(dispatch, categoryId) {
    dispatch(getDishesStart());
    try {
      const { data } = await axios.get(`/dishes/by-id/${categoryId}`);
      if (data) {
        dispatch(getDishesFailure());
      }
      return data;
    } catch (error) {
      console.log(error);
      dispatch(getDishesFailure());
    }
  },
};

export default DishService;
