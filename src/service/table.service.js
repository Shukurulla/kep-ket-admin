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
      dispatch(getTablesSuccess(data.tables));
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
      dispatch(getTablesSuccess(data.tables));
    } catch (error) {
      console.log(error);
      dispatch(getTablesFailure());
    }
  },
  async editTable(dispatch, tableId, value) {
    dispatch(getTablesStart());
    try {
      await axios.put(`/table/table-edit/${tableId}`, value);

      const { data } = await axios.get(`/table/all-tables/${id}`);
      dispatch(getTablesSuccess(data.tables));
    } catch (error) {
      console.log(error);
      dispatch(getTablesFailure());
    }
  },
  async deleteTable(dispatch, tableId) {
    dispatch(getTablesStart());
    try {
      await axios.delete(`/table/table-delete/${tableId}`);
      const { data } = await axios.get(`/table/all-tables/${id}`);
      dispatch(getTablesSuccess(data.tables));
    } catch (error) {
      console.log(error);
      dispatch(getTablesFailure());
    }
  },
};

export default TableService;
