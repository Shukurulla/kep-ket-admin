import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import checkImage from "../../public/check-image.png";
import { useDispatch, useSelector } from "react-redux";
import DishService from "../service/dish.service.js";
import socket from "../utilities/socket.config.js";
import { getOrderSuccess } from "../slice/orders.slice.js";
import notificationSound from "../../public/notification-sound.wav";
import { toast } from "react-hot-toast";
import axios from "../service/api.js";
import OrderService from "../service/order.service.js";
const OrderComponent = ({ item }) => {
  const [timeDifference, setTimeDifference] = useState("00:00");
  const [timeColor, setTimeColor] = useState("");
  const [selectFood, setSelectFood] = useState([]);
  const { orders } = useSelector((state) => state.order);
  const { dishes } = useSelector((state) => state.dish);
  const dispatch = useDispatch();
  const { waiters } = useSelector((state) => state.waiter);
  const [foods, setFoods] = useState(item.items);
  const [prepared, setPrepared] = useState(item.prepared); // Notifications state

  useEffect(() => {
    const restaurantId = item.restaurantId;

    if (restaurantId) {
      socket.emit("join_restaurant", restaurantId);
    }

    const handleNewOrder = (newOrder) => {
      console.log("Yangi buyurtma qabul qilindi:", newOrder);
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          const notification = new Notification("Yangi buyurtma", {
            body: "Buyurtma",
            icon: "logo",
            tag: "Xush kelibsiz",
          });
          notification.addEventListener("error", (e) => {
            alert("Xatolik yuz berdi");
          });
        }
      });
      dispatch(getOrderSuccess([...orders, newOrder]));
    };

    const handleOrderUpdate = (updatedOrder) => {
      console.log("Buyurtma yangilanishi qabul qilindi:", updatedOrder);
      if (updatedOrder._id === item._id) {
        setFoods(updatedOrder.items);
      }
      showNotification(
        "Buyurtma yangilandi",
        `Buyurtma ID: ${updatedOrder._id}`
      );
    };

    socket.on("get_new_order", handleNewOrder);
    socket.on("get_order_update", handleOrderUpdate);

    return () => {
      socket.off("get_new_order", handleNewOrder);
      socket.off("get_order_update", handleOrderUpdate);
    };
  }, [item.restaurantId, item._id, dispatch]);

  function showNotification(title, message) {
    Notification.requestPermission().then((perm) => {
      if (perm == "granted") {
        const notification = new Notification(title, {
          body: message,
          data: { hello: "Hello" },
          icon: "logo",
          tag: "Welcome message",
        });
        notification.addEventListener("error", (e) => {
          alert("error");
        });
      }
    });
  }

  // Bu yerda showNotification funksiyasini chaqirish orqali notification chiqariladi

  useEffect(() => {
    DishService.getDish(dispatch);
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [dispatch, orders]);

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
      setSelectFood(selectFood.filter((c) => c.foodId !== food.id));
    } else if (
      item.prepared.filter((c) => c.mealId == food.mealId).length > 0
    ) {
      setSelectFood(selectFood.filter((c) => c.mealId != food.mealId));
    } else {
      setSelectFood([...selectFood, { ...food, foodImage: find.image }]);
    }
    if (selectFood.filter((c) => c.foodId == food.foodId).length > 0) {
      setSelectFood(selectFood.filter((c) => c.foodId !== food.foodId));
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
    await socket.on("get_notification", (notification) => {
      if (notification?.meals) {
        OrderService.getOrder(dispatch);
        setSelectFood([]); // Faqat ushbu buyurtma uchun selectFood yangilab qo‘yiladi
        toast.success("Buyurtma jo'natildi");
      }
    });
  };

  useEffect(() => {
    return () => {
      socket.off("get_notification"); // Cleanup listener on unmount
    };
  }, []);

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
          item.items.map((food) => (
            <div key={food._id} className="flex justify-between mt-2">
              <p>{food.dish.name}</p>
              <span className="flex gap-2 items-center">
                {food.quantity}
                {item.prepared.filter((c) => c.mealId == food._id).length >
                0 ? (
                  <div className="w-[25px] h-[25px] cursor-pointer">
                    <img
                      src={checkImage}
                      alt=""
                      className="w-[15px] h-[15px]"
                    />
                  </div>
                ) : (
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
                )}
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
