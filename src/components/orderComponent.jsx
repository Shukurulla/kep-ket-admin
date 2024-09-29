import React, { useEffect, useState } from "react";
import axios from "../service/api";
import checkImage from "../../public/check-image.png";
import orderTime from "../../public/order-time.png";
import { useDispatch } from "react-redux";
import OrderService from "../service/order.service.js";

const OrderComponent = ({ item }) => {
  const createdAt = new Date(item.createdAt); // Qo'shilgan vaqtni oling
  const [timeDifference, setTimeDifference] = useState("00:00");
  const [timeColor, setTimeColor] = useState("");
  const [selectFood, setSelectFood] = useState([]);

  const dispatch = useDispatch();

  const updateTimer = () => {
    const now = new Date();
    const diff = now - createdAt; // Farqni millisekundlarda hisoblash

    const minutes = Math.floor(diff / (1000 * 60)); // Daqiqalarni hisoblash
    const seconds = Math.floor((diff % (1000 * 60)) / 1000); // Soniyalarni hisoblash

    // Rangni daqiqalarga asoslangan holda o'zgartiramiz
    if (minutes < 3) {
      setTimeColor("#8CD23C"); // Yashil (3 daqiqagacha)
    } else if (minutes >= 3 && minutes < 5) {
      setTimeColor("#F09D21"); // Sariq (3-5 daqiqa oralig'i)
    } else if (minutes >= 5) {
      setTimeColor("#D24E3C"); // Qizil (5 daqiqadan oshsa)
    }

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    setTimeDifference(`${formattedMinutes}:${formattedSeconds}`); // Daqiqa:soniyalar formatida ko'rsatish
  };

  useEffect(() => {
    const timer = setInterval(updateTimer, 1000); // Har bir soniyada yangilanadi
    return () => clearInterval(timer); // Komponent unmount qilinganda timer to'xtaydi
  }, []);

  const selectionHandler = (food) => {
    const arr = new Array(food);

    const findFood = item.prepared
      .concat(selectFood)
      .filter((c) => c.id == food.id);
    if (findFood.length > 0) {
      return setSelectFood(selectFood.filter((c) => c.id !== food.id));
    } else if (item.prepared.filter((c) => c.id == food.id).length > 0) {
      return setSelectFood(selectFood);
    } else {
      setSelectFood(selectFood.concat(arr));
      if (selectFood == []) {
        setSelectFood(arr);
      }
    }
  };

  useEffect(() => {
    console.log(item.prepared.concat(selectFood));
  }, [selectFood]);
  const schema = {
    table: {
      id: item.tableNumber.id,
      number: item.tableNumber.number,
    },
    waiter: {
      id: item.waiter.id,
      name: item.waiter.name,
    },
    orderId: item._id,
    meals: selectFood,
    totalPrice: item.totalPrice,
    restaurantId: item.restaurantId,
  };

  const submitHandler = () => {
    OrderService.postNotification(dispatch, schema);
  };

  const allSelect = () => {
    let diferentFoods = item.prepared.map((item) =>
      item.items.map((food) => item.id !== food.id)
    );
    console.log(diferentFoods);
  };

  return (
    <div className="relative bg-white p-4 rounded-[30px]">
      <div className="waiter-name absolute top-[0] left-[50%] font-[] translate-x-[-50%] translate-y-[-50%] bg-[#EDF2F6] p-2 rounded-[10px] border-[1px] border-[#000] ">
        <p className="font-[700]"> {item.waiter.name}</p>
      </div>
      <div className="order-header mt-3 flex items-center justify-between">
        <div className="table-number p-[20px] bg-[#EDF2F6] rounded-[20px] text-[20px] font-[700] border-[1px] border-[#DEE2E6]">
          №{item.tableNumber.number}
        </div>
        <div className="header-option">
          <div className="params flex justify-end">
            <div
              onClick={() => allSelect()}
              className="w-[25px]  border-[1px] border-[#949393] h-[25px] cursor-pointer flex items-center justify-center bg-[#EDF2F6] rounded-[5px]"
            >
              <img src={checkImage} className="w-[15px] h-[15px] " alt="" />
            </div>
          </div>
          <div
            style={{ color: timeColor }}
            className={`text-[${timeColor}] mt-2 flex items-center gap-[10px]`}
          >
            {timeDifference} <i className="bi bi-stopwatch"></i>
          </div>
        </div>
      </div>
      <div className="items">
        {item.items.map((food) => (
          <div className="flex justify-between mt-2" key={food.dish.name}>
            <p className="font-[700] text-[#393939]">{food.dish.name}</p>{" "}
            <span className="flex gap-2 items-center  ">
              {food.quantity}{" "}
              <div
                onClick={() =>
                  selectionHandler({ name: food.dish.name, id: food.dish.id })
                }
                className="w-[25px] m-0 p-0 h-[25px] border-[1px] border-[#949393] cursor-pointer flex items-center justify-center bg-[#EDF2F6] rounded-[5px]"
              >
                {item.prepared.filter((c) => c.id == food.dish.id).length >
                0 ? (
                  <img src={checkImage} className="w-[15px] h-[15px] " alt="" />
                ) : (
                  ""
                )}{" "}
                {selectFood.filter((c) => c.id == food.dish.id).length > 0 ? (
                  <img src={checkImage} className="w-[15px] h-[15px] " alt="" />
                ) : (
                  ""
                )}
              </div>
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={() => submitHandler()}
          disabled={selectFood.length == 0}
          className="btn btn-success"
        >
          Yuborish
        </button>
      </div>
    </div>
  );
};

export default OrderComponent;
