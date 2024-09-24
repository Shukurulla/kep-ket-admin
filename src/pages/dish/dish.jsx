import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DishService from "../../service/dish.service";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/loading.jsx";
import { changeActivePage } from "../../slice/ui.js";

const Dish = () => {
  const [select, setSelect] = useState("all");
  const { categories } = useSelector((state) => state.category);
  const { dishes, isLoading } = useSelector((state) => state.dish);
  const dispatch = useDispatch();

  useEffect(() => {
    DishService.getDish(dispatch);
    dispatch(changeActivePage("Ovqatlar"));
  }, []);

  const handleDelete = (id) => {
    DishService.deleteDish(dispatch, id);
  };

  return isLoading ? (
    <div className="w-[100%] h-[100%] bg-transparent flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <div className="md:p-3 lg:py-[20px] py-[30px] px-[10px] ">
      <h4 className="font-nunito page-label font-[600]">Ovqatlar</h4>
      <p className="font-nunito page-path pt-1">Ovqatlar /</p>
      <div className="config py-3 flex items-center justify-between ">
        <select onChange={(e) => setSelect(e.target.value)}>
          <option value="all">Barchasi</option>
          {categories?.map((item) => (
            <option value={item.name} key={item._id}>
              {item.name}{" "}
            </option>
          ))}
        </select>
        <div className="add">
          <Link to={"/add-food"} className="btn btn-primary">
            + Qoshish
          </Link>
        </div>
      </div>
      <div className="dishes row">
        {dishes
          ?.filter((c) => (select == "all" ? c : c.category.name == select))
          .map((item) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 col-6 mt-2 "
              key={item._id}
            >
              <div
                className="card shadow-sm p-1"
                style={{ backgroundColor: "#fff" }}
              >
                <div className="card-image" style={{ height: "130px" }}>
                  <img
                    src={item.image}
                    className="w-100 rounded h-100"
                    alt=""
                  />
                </div>
                <div className="card-body">
                  <p className="card-text pb-3">{item.name}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        to={`/edit-food/${item._id}`}
                      >
                        Edit
                      </Link>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dish;
