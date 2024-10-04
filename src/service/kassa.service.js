import {
  getReportsFailure,
  getReportsStart,
  getReportsSuccess,
} from "../slice/kassa.slice.js";
import ordersSlice from "../slice/orders.slice.js";
import axios from "./api.js";
import OrderService from "./order.service.js";

const KassaService = {
  async getKassa(dispatch) {
    dispatch(getReportsStart());
    try {
      const { data } = await axios.get("/kassa/my-kassa");
      dispatch(getReportsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getReportsFailure());
    }
  },
  async postKassa(dispatch, value) {
    dispatch(getReportsStart());
    try {
      await axios.post("/kassa/create-kassa", value);
      const { data } = await axios.get("/kassa/my-kassa");
      dispatch(getReportsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getReportsFailure());
    }
  },
  async kassaById(dispatch, id) {
    dispatch(getReportsStart());
    try {
      const { data } = await axios.get(`/kassa/kassa/${id}`);
      dispatch(getReportsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getReportsFailure());
    }
  },
};
export default KassaService;
