import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateTable from "./createTable";
import EditTable from "./editTable";
import { useTabs } from "@material-tailwind/react";
import TableService from "../../service/table.service";

const Tables = () => {
  const { tables } = useSelector((state) => state.table);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [table, setTable] = useState();
  const dispatch = useDispatch();

  const editShowHandler = (value) => {
    setTable(value);
    setShowEdit(true);
  };

  const deleteHandler = (id) => {
    TableService.deleteTable(dispatch, id);
    window.location.reload();
  };

  return (
    <div className="md:p-3 lg:py-[20px] py-[30px] px-[10px] ">
      {showCreate ? <CreateTable setState={setShowCreate} /> : ""}
      {showEdit ? <EditTable setState={setShowEdit} table={table} /> : ""}
      <h4 className="font-nunito page-label font-[600]">Stollar</h4>
      <p className="font-nunito page-path pt-1">Stollar /</p>{" "}
      <div className="config py-3 flex items-center justify-between ">
        <h1 className="text-[20px]">Stollar soni ({tables.length})</h1>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
          + Qoshish
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>QR Code</th>
            <th>Stol Raqami</th>
            <th>Orindiqlar</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((item, idx) => (
            <tr>
              <td>{idx + 1}</td>
              <td>
                <a
                  target="_blank"
                  href={`https://unify-liard.vercel.app/table/${item._id}.${item.restaurantId}`}
                >
                  <img
                    src={`http://api.qrserver.com/v1/create-qr-code/?data=${`https://unify-liard.vercel.app/table/${item._id}.${item.restaurantId}`}&size=x&bgcolor=`}
                    className="w-[50px]"
                    alt=""
                  />
                </a>
              </td>
              <td>{item.tableNumber}</td>
              <td>{item.capacity}</td>
              <td className=" gap-2">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHandler(item._id)}
                >
                  Ochirish
                </button>
                <button
                  className="btn mx-2 btn-success"
                  onClick={() => editShowHandler(item)}
                >
                  Ozgartirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
