import React, { useState } from "react";
import "./tables.scss";
import TableService from "../../service/table.service";
import { useDispatch, useSelector } from "react-redux";

const EditTable = ({ setState, table }) => {
  const [number, setNumber] = useState(table.tableNumber);
  const [capacity, setCapacity] = useState(table.capacity);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const value = {
      tableNumber: number,
      capacity,
      restaurantId: localStorage.getItem("userId"),
    };
    try {
      TableService.editTable(dispatch, table._id, value);
      TableService.getTables(dispatch);
      setState(false);
    } catch (error) {}
  };

  return (
    <div className="table-wrapper w-[100%] h-[90vh] flex items-center justify-center">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="row">
          <div className="input col-lg-6 ">
            <label htmlFor="username pb-2">Stol Raqami</label>
            <div className="input-group mb-3">
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="form-control"
                aria-label="Username"
                required
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="input col-lg-6 ">
            <label htmlFor="username pb-2">Orindiqlar</label>
            <div className="input-group mb-3">
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="form-control"
                aria-label="Username"
                required
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setState(false)}
            className="btn btn-outline-secondary"
          >
            Bekor qilish
          </button>
          <button type="submit" className="btn btn-outline-primary">
            Qoshish
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTable;
