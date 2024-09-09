import React, { useState } from "react";
import "./tables.scss";
import TableService from "../../service/table.service";
import { useDispatch } from "react-redux";

const CreateTable = ({ setState }) => {
  const [number, setNumber] = useState();
  const [capacity, setCapacity] = useState();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const value = {
      tableNumber: number,
      capacity,
      restaurantId: localStorage.getItem("userId"),
    };
    TableService.postTable(dispatch, value);
    setState(false);
  };

  return (
    <div className="table-wrapper w-[100%] h-[100%] flex items-center justify-center">
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

export default CreateTable;
