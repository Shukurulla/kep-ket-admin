import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import checkImage from "../../public/check-image.png";
import { useDispatch, useSelector } from "react-redux";
import DishService from "../service/dish.service.js";
import socket from "../utilities/socket.config.js";

const OrderComponent = ({ item }) => {
  const [timeDifference, setTimeDifference] = useState("00:00");
  const [timeColor, setTimeColor] = useState("");
  const [selectFood, setSelectFood] = useState([]);
  const { orders } = useSelector((state) => state.order);
  const { dishes } = useSelector((state) => state.dish);
  const dispatch = useDispatch();
  const { waiters } = useSelector((state) => state.waiter);
  const [foods, setFoods] = useState(item.items);
  console.log(item);

  // Socket ulanish
  useEffect(() => {
    // Socket ulanishni yaratish

    // Restaurant ID ni olish
    const restaurantId = item.restaurantId;

    // Restaurantga qo'shilish
    if (restaurantId) {
      socket.emit("join_restaurant", restaurantId);
    }
    console.log(orders);

    // Socket event'larni tinglash
    socket.on("get_new_order", (newOrder) => {
      console.log("New order received:", newOrder);
    });

    socket.on("get_order_update", (updatedOrder) => {
      console.log("Order update received:", updatedOrder);
      if (updatedOrder._id === item._id) {
        setFoods(updatedOrder.items);
      }
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      if (socket) {
        socket.off("get_new_order");
        socket.off("get_order_update");
        socket.off("connect");
        socket.off("connect_error");
        // socket.disconnect();
      }
    };
  }, [item.restaurantId, item._id]);

  useEffect(() => {
    DishService.getDish(dispatch);
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const updateTimer = () => {
    const now = new Date();
    const createdAt = new Date(item.createdAt);
    const diff = now.getTime() - createdAt.getTime();

    if (diff >= 0) {
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeDifference(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );

      if (minutes < 3) setTimeColor("#8CD23C");
      else if (minutes >= 3 && minutes < 5) setTimeColor("#F09D21");
      else setTimeColor("#D24E3C");
    }
  };

  const selectionHandler = (food) => {
    const find = dishes.filter((c) => c._id == food.foodId)[0];

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
      setSelectFood([...selectFood, { ...food, foodImage: find.image }]);
    }
  };

  const schema = {
    table: {
      id: item.tableNumber.id,
      number: item.tableNumber.number,
    },
    waiter: {
      id: item.waiter.id,
      name:
        item.waiter.name ||
        waiters.find((w) => w._id === item.waiter.id)?.username,
    },
    orderId: item._id,
    meals: selectFood,
    totalPrice: item.totalPrice,
    restaurantId: item.restaurantId,
  };

  const submitHandler = async () => {
    await socket.emit("send_notification", schema);
    socket.on("get_notification", (notification) => {
      console.log("Yangi bildirishnoma:", notification); // Eski bildirishnomalarga yangi bildirishnomani qo'shish
    });
  };

  return (
    <div className="relative bg-white p-4 rounded-[30px]">
      <div className="order-header mt-3 flex items-center justify-between">
        <div className="waiter-name absolute top-[0] left-[50%] font-[] translate-x-[-50%] translate-y-[-50%] bg-[#EDF2F6] p-2 rounded-[10px] border-[1px] border-[#000] ">
          <p className="font-[700]">
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
              <div className="w-[25px] border-[1px] border-[#949393] h-[25px] cursor-pointer flex items-center justify-center bg-[#EDF2F6] rounded-[5px]">
                <img src={checkImage} className="w-[15px] h-[15px]" alt="" />
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
      </div>
      <div className="items">
        {dishes &&
          foods.map((food) => (
            <div key={food._id} className="flex justify-between mt-2">
              <p>{food.dish.name}</p>
              <span className="flex gap-2 items-center">
                {food.quantity}
                <div
                  onClick={() =>
                    selectionHandler({
                      foodName: food.dish.name,
                      foodId: food.dish.id,
                      foodPrice: food.dish.price,
                      quantity: food.quantity,
                      foodImage: food.dish.image,
                      mealId: food._id,
                    })
                  }
                  className="w-[25px] h-[25px] cursor-pointer"
                >
                  {selectFood.some((c) => c.mealId === food._id) && (
                    <img
                      src={checkImage}
                      alt=""
                      className="w-[15px] h-[15px]"
                    />
                  )}
                </div>
              </span>
            </div>
          ))}
      </div>

      <div className="flex justify-center mt-2">
        <button
          onClick={() => submitHandler()}
          disabled={selectFood.length === 0}
          className="btn btn-success"
        >
          Yuborish
        </button>
      </div>
    </div>
  );
};

export default OrderComponent;
