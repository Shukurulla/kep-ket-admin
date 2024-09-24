import React, { useEffect, useState } from "react";
import axios from "../service/api";

const OrderComponent = ({ item }) => {
  const createdAt = new Date(item.createdAt); // Qo'shilgan vaqtni oling
  const [timeDifference, setTimeDifference] = useState("00:00:00");

  const [timeColor, setTimeColor] = useState("");
  const updateTimer = () => {
    const now = new Date();
    const diff = now - createdAt;

    const hours = Math.floor(diff / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");

    if (Math.floor(minutes) < 3) {
      setTimeColor("#8CD23C");
    } else if (Math.floor(minutes) >= 3 && Math.floor(minutes) < 5) {
      setTimeColor("#F09D21");
    } else if (Math.floor(minutes) > 5) {
      console.log(minutes);

      setTimeColor("#D24E3C");
    }
    setTimeDifference(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    setInterval(updateTimer, 1000);
  }, []);

  return (
    <div className="relative bg-white p-4 rounded-[30px]">
      <div className="waiter-name absolute top-[0] left-[50%] font-[] translate-x-[-50%] translate-y-[-50%] bg-[#EDF2F6] p-2 rounded-[10px] border-[1px] border-[#000] ">
        {item.waiter.name}
      </div>
      <div className="order-header flex items-center justify-between">
        <div className="table-number p-[20px] bg-[#EDF2F6] rounded-[20px] text-[20px] font-[700] border-[1px] border-[#DEE2E6]">
          №{item.tableNumber.number}
        </div>
        <div className="header-option">
          <div className="params">
            <input type="checkbox" />
          </div>
          <div style={{ color: timeColor }} className={`text-[${timeColor}]`}>
            {timeDifference}
          </div>
        </div>
      </div>
      <div className="items">
        {item.items.map((food) => (
          <div className="flex justify-between">
            {food.dish.name}{" "}
            <span className="flex gap-2 items-center">
              {food.quantity} <input type="checkbox" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderComponent;
