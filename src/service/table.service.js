import {
  getTablesFailure,
  getTablesStart,
  getTablesSuccess,
} from "../slice/table.slice";
import axios from "./api";
const id = localStorage.getItem("userId");

const TableService = {
  async getTables(dispatch) {
    dispatch(getTablesStart());
    try {
      const { data } = await axios.get(`/table/all-tables/${id}`);
      dispatch(getTablesSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getTablesFailure());
    }
  },
  async postTable(dispatch, value) {
    dispatch(getTablesStart());
    try {
      await axios.post(`/table/create-table`, value);
      const { data } = await axios.get(`/table/all-tables/${id}`);
      dispatch(getTablesSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getTablesFailure());
    }
  },
  async editTable(dispatch, id, value) {
    dispatch(getTablesStart());
    try {
      await axios.put(`/table/table-edit/${id}`, value);

      const { data } = await axios.get(`/table/all-tables/${id}`);
      dispatch(getTablesSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getTablesFailure());
    }
  },
  async deleteTable(dispatch, id) {
    dispatch(getTablesStart());
    try {
      await axios.delete(`/table/table-delete/${id}`);
      const { data } = await axios.get(`/table/all-tables/${id}`);
      dispatch(getTablesSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getTablesFailure());
    }
  },
};

export default TableService;
