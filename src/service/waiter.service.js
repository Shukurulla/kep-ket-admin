import {
  getWaiterFailure,
  getWaiterServiceInfo,
  getWaiterStart,
  getWaiterSuccess,
} from "../slice/waiter.slice";
import axios from "./api";

const id = localStorage.getItem("userId");
const WaiterService = {
  async getWaiters(dispatch) {
    dispatch(getWaiterStart());
    try {
      const { data } = await axios.get(`/waiter/all/${id}`);
      dispatch(getWaiterSuccess(data));
    } catch (error) {
      dispatch(getWaiterFailure());
    }
  },
  async postWaiters(dispatch, value) {
    dispatch(getWaiterStart());
    try {
      const { data } = await axios.post(`/waiter/`, value);
      dispatch(getWaiterSuccess(data));
    } catch (error) {
      dispatch(getWaiterFailure());
    }
  },
  async editWaiters(dispatch, id, value) {
    dispatch(getWaiterStart());
    try {
      const { data } = await axios.put(`/waiter/${id}`, value);
      dispatch(getWaiterSuccess(data));
    } catch (error) {
      dispatch(getWaiterFailure());
    }
  },
  async deleteWaiters(dispatch, id) {
    dispatch(getWaiterStart());
    try {
      const { data } = await axios.delete(`/waiter/${id}`);
      dispatch(getWaiterSuccess(data));
    } catch (error) {
      dispatch(getWaiterFailure());
    }
  },
  async getWaiterService(dispatch) {
    dispatch(getWaiterStart());
    try {
      const { data } = await axios.get("/waiter/waiters-info");
      dispatch(getWaiterServiceInfo(data));
    } catch (error) {
      console.log(error);
      dispatch(getWaiterFailure());
    }
  },
};

export default WaiterService;
