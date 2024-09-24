import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeActivePage } from "../../slice/ui.js";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeActivePage("Bosh sahifa"));
  }, []);
  return (
    <div className="md:p-3 lg:py-[20px] py-[30px] px-[10px]">
      <h4 className="font-nunito page-label font-[600]">Bosh sahifa</h4>
      <p className="font-nunito page-path pt-1">Bosh sahifa /</p>
    </div>
  );
};

export default Home;
