import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeActivePage } from "../../slice/ui.js";

const Report = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeActivePage("Hisobotlar"));
  }, []);
  return (
    <div className="md:p-3 lg:py-[20px] py-[30px] px-[10px]">
      <h4 className="font-nunito page-label font-[600]">Hisobotlar</h4>
      <p className="font-nunito page-path pt-1">Hisobotlar /</p>
    </div>
  );
};

export default Report;
