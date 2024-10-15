import React, { useEffect } from "react";
import PromoCodeService from "../../service/promocode.service.js";
import { changeActivePage } from "../../slice/ui.js";
import { useDispatch, useSelector } from "react-redux";
import WaiterService from "../../service/waiter.service.js";
import Loading from "../../components/loading/loading.jsx";
import WaiterBox from "../../components/waiter/waiter-box.jsx";

const Waiters = () => {
  const dispatch = useDispatch();
  const { isLoading, waiterServiceInfo, waiters } = useSelector(
    (state) => state.waiter
  );

  useEffect(() => {
    WaiterService.getWaiters(dispatch);
    WaiterService.getWaiterService(dispatch);
    dispatch(changeActivePage("Ofitsiyantlar"));
  }, []);

  return isLoading ? (
    <div className="w-[100%] h-[100%] bg-transparent flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <div className="md:p-3 lg:py-[20px] py-[30px] px-[10px]">
      <h4 className="font-nunito page-label font-[600]">Ofitsiyantlar</h4>
      <p className="font-nunito page-path pt-1">Ofitsiyantlar /</p>
      <div className="row">
        {waiterServiceInfo.map((item) => (
          <div className="col-lg-4 col-md-6 mt-3 col-sm-12">
            <WaiterBox waiter={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Waiters;
