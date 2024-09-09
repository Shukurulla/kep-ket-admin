import React, { useState } from "react";
import "../table/tables.scss";
import TableService from "../../service/table.service";
import { useDispatch } from "react-redux";
import CategoryService from "../../service/category.service";

const EditCategory = ({ setState, category }) => {
  const [number, setNumber] = useState(category.name);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const value = {
      name: number,
      restaurantId: localStorage.getItem("userId"),
    };
    CategoryService.editCategory(dispatch, category._id, value);
    setState(false);
    window.location.reload();
  };

  return (
    <div className="table-wrapper w-[100%] h-[100%] flex items-center justify-center">
      <form onSubmit={(e) => submitHandler(e)} className="w-50">
        <div className="row">
          <div className="input ">
            <label htmlFor="username pb-2">Taom Turini Kiriting</label>
            <div className="input-group mb-3">
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
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

export default EditCategory;
