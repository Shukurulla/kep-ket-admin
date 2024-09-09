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
      const { data } = await axios.post(`/promocode/`, value);
      dispatch(getPromoCodeSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getPromoCodeFailure());
    }
  },
  async editPromoCode(dispatch, id, value) {
    dispatch(getPromoCodeStart());
    try {
      const { data } = await axios.put(`/promocode/${id}`, value);
      dispatch(getPromoCodeSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getPromoCodeFailure());
    }
  },
  async deletePromoCode(dispatch, id) {
    dispatch(getPromoCodeStart());
    try {
      const { data } = await axios.delete(`/promocode/${id}`);
      dispatch(getPromoCodeSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getPromoCodeFailure());
    }
  },
};

export default PromoCodeService;
