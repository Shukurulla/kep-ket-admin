import React, { useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/loading.jsx";
import { useNavigate } from "react-router-dom";
import UserService from "../service/user.service.js";

const Layaout = ({ activPage }) => {
  const { showSide } = useSelector((state) => state.ui);
  const { isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getUser(dispatch, navigate);
  }, []);

  return isLoading ? (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <div>
      <Navbar />
      <div className="row">
        <div
          className={`${
            showSide
              ? "col-lg-3 col-md-3 col-sm-4 col-8"
              : "col-lg-1 col-md-1 col-sm-2 col-2"
          }`}
        >
          <Sidebar />
        </div>
        <div
          className={`scroll ${window.innerWidth < 500 ? "pt-[40px]" : ""} ${
            showSide
              ? "col-lg-9 col-md-9 col-sm-8"
              : "col-lg-11 col-md-11 col-sm-10 col-9"
          }`}
        >
          <div className="relative w-[100%] h-[90vh]">{activPage}</div>
        </div>
      </div>
    </div>
  );
};

export default Layaout;
