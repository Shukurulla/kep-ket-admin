import {
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
} from "../slice/orders.slice";
import socket from "../utilities/socket.config.js";
import axios from "./api";
const id = localStorage.getItem("userId");
const token = localStorage.getItem("token");

const OrderService = {
  async getOrder(dispatch) {
    dispatch(getOrderStart());
    try {
      const { data } = await axios.get(`/orders/show-orders/${id}`);
      dispatch(getOrderSuccess(data));
      // Yangi buyurtmalarni qabul qilish
    } catch (error) {
      console.log(error);
      dispatch(getOrderFailure());
    }
  },

  async getAllOrders(dispatch) {
    dispatch(getOrderStart());
    try {
      const { data } = await axios.get(`/orders/all/${id}`);
      socket.on("get_new_order", (newOrders) => {
        dispatch(getOrderSuccess(newOrders)); // Yangi buyurtmalarni o'zgaruvchiga qo'shish
      });
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
  async postNotification(dispatch, value) {
    dispatch(getOrderStart());
    try {
      await axios.post("/notifications", value);
      const { data } = await axios.get(`/orders/all/${id}`);
      dispatch(getOrderSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getOrderFailure());
    }
  },
};
export default OrderService;
