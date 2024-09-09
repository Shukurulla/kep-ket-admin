import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../slice/ui";
import "./toast.scss";

const Toast = () => {
  const { toast } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  if (toast?.alert) {
    setTimeout(() => {
      dispatch(showToast({}));
    }, 2000);
  }

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      dispatch(
        showToast({
          alert: "Profildan muaffaqiyatli chiqildi",
          status: "success",
        })
      );
    }
  }, [window.localStorage]);

  return (
    <div
      className={`toast-box translate-x-[110%] ${
        toast?.alert ? "show" : ""
      } flex justify-between ${
        (toast.status && toast.status == "success" && "bg-success") ||
        toast.status == "bg-danger"
      } text-light right-[15px] top-20 p-3 rounded-[5px] sm:w-3/5 md:w-2/4 w-4/5`}
    >
      <span>{toast.alert ? toast.alert : ""}</span>
      <i
        className="bi bi-x-lg cursor-pointer"
        onClick={() => dispatch(showToast({}))}
      ></i>
    </div>
  );
};

export default Toast;
