import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateCategory from "./createCategory";
import EditCategory from "./editCategory";
import CategoryService from "../../service/category.service";

const Category = () => {
  const { categories } = useSelector((state) => state.category);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [category, setCategory] = useState();
  const editHandler = (item) => {
    setCategory(item);
    setShowEdit(true);
  };
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    CategoryService.deleteCategory(dispatch, id);
  };

  return (
    <div className="md:p-3 lg:py-[20px] py-[30px] px-[10px] ">
      {showCreate ? <CreateCategory setState={setShowCreate} /> : ""}
      {showEdit ? (
        <EditCategory setState={setShowEdit} category={category} />
      ) : (
        ""
      )}
      <h4 className="font-nunito page-label font-[600]">Kategoriyalar</h4>
      <p className="font-nunito page-path pt-1">Kategoriyalar /</p>
      <div className="flex items-center justify-between">
        <h1 className="text-[20px]">Kategoriyalar </h1>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
          + Qoshish
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr className="row">
            <th className="col">No.</th>
            <th className="col">Taom Turi</th>
            <th className="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, idx) => (
            <tr className="row">
              <td className="col">{idx + 1}</td>
              <td className="col">{item.name}</td>
              <td className="col flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => editHandler(item)}
                >
                  Ozgartirish
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHandler(item._id)}
                >
                  Ochirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
