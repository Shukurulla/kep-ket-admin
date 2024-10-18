import React, { useEffect, useState } from "react";
import axios from "../service/api";
import checkImage from "../../public/check-image.png";
import orderTime from "../../public/order-time.png";
import { useDispatch } from "react-redux";
import OrderService from "../service/order.service.js";
import { useSelector } from "react-redux";
import DishService from "../service/dish.service.js";

const OrderComponent = ({ item }) => {
  const createdAt = new Date(item.createdAt); // Qo'shilgan vaqtni oling
  const [timeDifference, setTimeDifference] = useState("00:00");
  const [timeColor, setTimeColor] = useState("");
  const [selectFood, setSelectFood] = useState([]);
  const { dishes } = useSelector((state) => state.dish);
  const dispatch = useDispatch();
  const { waiters } = useSelector((state) => state.waiter);

  const findDish = (dish) => {
    const thisDish = dishes.filter((c) => c._id == dish.id)[0];

    return thisDish;
  };

  const updateTimer = () => {
    const now = new Date(); // Hozirgi vaqtni oling
    const diff = now.getTime() - createdAt.getTime(); // Vaqt farqini millisekundlarda hisoblang

    if (diff >= 0) {
      // Agar farq musbat bo'lsa
      const minutes = Math.floor(diff / (1000 * 60)); // Daqiqalarni hisoblash
      const seconds = Math.floor((diff % (1000 * 60)) / 1000); // Soniyalarni hisoblash

      // Agar vaqt juda kichik bo'lsa, to'g'rilash
      if (minutes === 0 && seconds === 0) {
        setTimeDifference("00:01"); // 00:00 dan keyin 00:01 ni ko'rsatish
      } else {
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");
        setTimeDifference(`${formattedMinutes}:${formattedSeconds}`); // Vaqtni yangilash
      }

      // Rangni daqiqalarga asoslangan holda o'zgartiramiz
      if (minutes < 3) {
        setTimeColor("#8CD23C"); // Yashil (3 daqiqagacha)
      } else if (minutes >= 3 && minutes < 5) {
        setTimeColor("#F09D21"); // Sariq (3-5 daqiqa oralig'i)
      } else if (minutes >= 5) {
        setTimeColor("#D24E3C"); // Qizil (5 daqiqadan oshsa)
      }
    } else {
      setTimeDifference("00:00"); // Agar farq salbiy bo'lsa, vaqtni 00:00 dan boshlash
    }
  };

  useEffect(() => {
    DishService.getDish(dispatch);

    const timer = setInterval(updateTimer, 1000); // Har bir soniyada yangilanadi
    return () => clearInterval(timer); // Komponent unmount qilinganda timer to'xtaydi
  }, []);

  const selectionHandler = (food) => {
    const arr = new Array(food);

    const findFood = item.prepared
      .concat(selectFood)
      .filter((c) => c.mealId == food.mealId);

    if (findFood.length > 0) {
      return setSelectFood(selectFood.filter((c) => c.foodId !== food.id));
    } else if (
      item.prepared.filter((c) => c.mealId == food.mealId).length > 0
    ) {
      return setSelectFood(selectFood);
    } else {
      setSelectFood(selectFood.concat(arr));
      if (selectFood.length === 0) {
        setSelectFood(arr);
      }
    }
  };

  const schema = {
    table: {
      id: item.tableNumber.id,
      number: item.tableNumber.number,
    },
    waiter: {
      id: item.waiter.id,
      name: item.waiter.name
        ? item.waiter.name
        : waiters.filter((c) => c._id == item.waiter.id)[0]?.username,
    },
    orderId: item._id,
    meals: selectFood,
    totalPrice: item.totalPrice,
    restaurantId: item.restaurantId,
  };

  const submitHandler = () => {
    OrderService.postNotification(dispatch, schema);
    console.log(schema);
  };

  const allSelect = () => {
    for (let i = 0; i < item.item.length; i++) {}
  };

  return (
    <div className="relative bg-white p-4 rounded-[30px]">
      <div className="waiter-name absolute top-[0] left-[50%] font-[] translate-x-[-50%] translate-y-[-50%] bg-[#EDF2F6] p-2 rounded-[10px] border-[1px] border-[#000] ">
        <p className="font-[700]">
          {" "}
          {item.waiter?.name
            ? item.waiter.name
            : waiters.filter((c) => c._id == item.waiter.id)[0]?.username}
        </p>
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
        {dishes &&
          item.items.map((food) => (
            <div className="flex justify-between mt-2" key={food._id}>
              {" "}
              {/* food._id kalit sifatida ishlatilmoqda */}
              <p className="font-[700] text-[#393939]">{food.dish.name}</p>{" "}
              <span className="flex gap-2 items-center  ">
                {food.quantity}{" "}
                <div
                  onClick={() =>
                    selectionHandler({
                      foodName: food.dish.name,
                      foodId: food.dish.id,
                      foodPrice: food.dish.price,
                      quantity: food.quantity,
                      foodImage: findDish(food.dish).image,
                      mealId: food._id,
                    })
                  }
                  className="w-[25px] m-0 p-0 h-[25px] border-[1px] border-[#949393] cursor-pointer flex items-center justify-center bg-[#EDF2F6] rounded-[5px]"
                >
                  {item.prepared.filter((c) => c.mealId == food._id).length >
                  0 ? (
                    <img
                      src={checkImage}
                      className="w-[15px] h-[15px]"
                      alt=""
                    />
                  ) : (
                    ""
                  )}{" "}
                  {selectFood.filter((c) => c.mealId == food._id).length > 0 ? (
                    <img
                      src={checkImage}
                      className="w-[15px] h-[15px]"
                      alt=""
                    />
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
