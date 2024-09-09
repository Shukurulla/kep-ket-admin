import {
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
} from "../slice/category.slice";
import axios from "./api";
const id = localStorage.getItem("userId");
const CategoryService = {
  async getCategory(dispatch) {
    dispatch(getCategoryStart());
    try {
      const { data } = await axios.get(`/category/all/${id}`);
      console.log(data);

      dispatch(getCategorySuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getCategoryFailure());
    }
  },
  async postCategory(dispatch, value) {
    dispatch(getCategoryStart());
    try {
      const { data } = await axios.post(`/category/`, value);
      dispatch(getCategorySuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getCategoryFailure());
    }
  },
  async editCategory(dispatch, id, value) {
    dispatch(getCategoryStart());
    try {
      const { data } = await axios.put(`/category/${id}`, value);
      dispatch(getCategorySuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getCategoryFailure());
    }
  },
  async deleteCategory(dispatch, id) {
    dispatch(getCategoryStart());
    try {
      const { data } = await axios.delete(`/category/${id}`);
      dispatch(getCategorySuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getCategoryFailure());
    }
  },
};

export default CategoryService;
