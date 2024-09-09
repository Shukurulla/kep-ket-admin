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
      await axios.post(`/category/`, value);
      const { data } = await axios.get(`category/all/${id}`);
      dispatch(getCategorySuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getCategoryFailure());
    }
  },
  async editCategory(dispatch, categoryId, value) {
    dispatch(getCategoryStart());
    try {
      await axios.put(`/category/${categoryId}`, value);
      const { data } = await axios.get(`category/all/${id}`);
      dispatch(getCategorySuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getCategoryFailure());
    }
  },
  async deleteCategory(dispatch, categoryId) {
    dispatch(getCategoryStart());
    try {
      await axios.delete(`/category/${categoryId}`);
      const { data } = await axios.get(`/category/all/${id}`);
      dispatch(getCategorySuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getCategoryFailure());
    }
  },
};

export default CategoryService;
