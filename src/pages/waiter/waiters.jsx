import React, { useEffect } from "react";
import PromoCodeService from "../../service/promocode.service.js";
import { changeActivePage } from "../../slice/ui.js";
import { useDispatch, useSelector } from "react-redux";
import WaiterService from "../../service/waiter.service.js";
import Loading from "../../components/loading/loading.jsx";

const Waiters = () => {
  const dispatch = useDispatch();
  const { isLoading, waiterServiceInfo, waiters } = useSelector(
    (state) => state.waiter
  );

  const { reports } = useSelector((state) => state.kassa);

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
          <div className="col-lg-6 col-md-6 mt-3 col-sm-12">
            <div className="bg-white p-4 rounded-[5px] relative ">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <img
                    src={item.imageWaiter}
                    className="w-[120px] h-[120px] object-cover rounded-full"
                    alt=""
                  />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                  <h1 className="sm:text-[22px] font-[600] font-nunito text-[#012970]">
                    {item.name}
                  </h1>
                  <div
                    className={`absolute top-2 right-2 p-1 text-light rounded-md  px-3 ${
                      item.atWork ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {item.atWork ? "Ishda" : "Ishda emas"}
                  </div>
                  <div className="flex items-center mt-2 justify-between">
                    <span className="font-nunito sm:text-[18px] font-[600]">
                      Ishga kelgan sana:{" "}
                    </span>
                    <span className="font-nunito ">
                      {new Date(
                        waiters.filter(
                          (c) => c._id == item.waiterId
                        )[0].createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center mt-1 justify-between">
                    <span className="font-nunito sm:text-[18px] font-[600]">
                      Buyurtmalar soni:{" "}
                    </span>
                    <span className="font-nunito">
                      {
                        reports.filter((c) => c.waiter.id == item.waiterId)
                          .length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Waiters;
