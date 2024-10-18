import toast from "react-hot-toast";
import { getOrderStart } from "../slice/orders.slice.js";
import {
  getPromoCodeFailure,
  getPromoCodeStart,
  getPromoCodeSuccess,
} from "../slice/promocode.slice";
import axios from "./api";
const id = localStorage.getItem("userId");

const PromoCodeService = {
  async getPromoCode(dispatch) {
    dispatch(getPromoCodeStart());
    try {
      const { data } = await axios.get(`/promocode/all/${id}`);
      dispatch(getPromoCodeSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getPromoCodeFailure());
    }
  },
  async postPromoCode(dispatch, value) {
    dispatch(getPromoCodeStart());
    try {
      await axios.post(`/promocode/`, value);
      const { data } = await axios.get(`/promocode/all/${id}`);
      dispatch(getPromoCodeSuccess(data));
      toast.success("Promocode muaffaqiyatli qoshildi");
    } catch (error) {
      console.log(error);
      dispatch(getPromoCodeFailure());
    }
  },
  async editPromoCode(dispatch, id, value) {
    dispatch(getPromoCodeStart());
    try {
      await axios.put(`/promocode/${id}`, value);
      const { data } = await axios.get(`/promocode/all/${id}`);
      dispatch(getPromoCodeSuccess(data));
      toast.success("Promocode muaffaqiyatli ozgartirildi");
    } catch (error) {
      console.log(error);
      dispatch(getPromoCodeFailure());
    }
  },
  async deletePromoCode(dispatch, id) {
    dispatch(getPromoCodeStart());
    try {
      await axios.delete(`/promocode/${id}`);
      const { data } = await axios.get(`/promocode/all/${id}`);
      dispatch(getPromoCodeSuccess(data));
      toast.success("Taom muaffaqiyatli ochirildi");
    } catch (error) {
      console.log(error);
      dispatch(getPromoCodeFailure());
    }
  },
};

export default PromoCodeService;
