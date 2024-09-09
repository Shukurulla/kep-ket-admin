import {
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
} from "../slice/orders.slice";
import axios from "./api";
const id = localStorage.getItem("userId");
const token = localStorage.getItem("token");

const OrderService = {
  async getOrder(dispatch) {
    dispatch(getOrderStart());
    try {
      const { data } = await axios.get(`/orders/all/${id}`);
      dispatch(getOrderSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getOrderFailure());
    }
  },
  async postOrder(dispatch, value) {
    dispatch(getOrderStart());
    try {
      const { data } = await axios.post(`/orders/create-order`, value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getOrderSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getOrderFailure());
    }
  },
  async editOrder(dispatch, id, value) {
    dispatch(getOrderStart());
    try {
      const { data } = await axios.put(`/orders/${id}`, value);
      dispatch(getOrderSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getOrderFailure());
    }
  },
  async deleteOrder(dispatch, id) {
    dispatch(getOrderStart());
    try {
      const { data } = await axios.delete(`/orders/${id}`);
      dispatch(getOrderSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getOrderFailure());
    }
  },
};
export default OrderService;
