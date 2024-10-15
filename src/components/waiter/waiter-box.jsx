import React from "react";
import { useSelector } from "react-redux";

const WaiterBox = ({ waiter }) => {
  const { waiters } = useSelector((state) => state.waiter);
  const { reports } = useSelector((state) => state.kassa);

  return (
    <div className="bg-white p-[16px] rounded-[18px] relative ">
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
          <img
            src={waiter.imageWaiter}
            className="w-[70px] h-[70px] object-cover rounded-[15px]"
            alt=""
          />
        </div>
        <div className="col-lg-8 pl-0 col-md-8 col-sm-8 col-8">
          <h1 className="text-[15px] font-[700] font-nunito text-[#000000]">
            {waiter.name}
          </h1>
          <div
            className={`absolute top-2 right-2 text-[12px] text-light rounded-md  px-2 ${
              waiter.atWork ? "bg-success" : "bg-danger"
            }`}
          >
            {waiter.atWork ? "Ishda" : "Ishda emas"}
          </div>
          <div className="flex waiters-center mt-2 justify-between">
            <span className="font-nunito text-[14px] font-[600] text-[#14161B80]">
              Ishga kelgan sana:{" "}
            </span>
            <span className="font-nunito text-[12px] font-[600]">
              {new Date(
                waiters.filter((c) => c._id == waiter.waiterId)[0].createdAt
              ).toLocaleDateString()}
            </span>
          </div>
          <div className="flex waiters-center mt-1 justify-between">
            <span className="font-nunito text-[#14161B80] text-[14px] font-[600]">
              Buyurtmalar soni:{" "}
            </span>
            <span className="font-nunito text-[12px] font-[600]">
              {waiter.orderCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterBox;
