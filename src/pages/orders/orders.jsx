import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderComponent from "../../components/orderComponent.jsx";
import Loading from "../../components/loading/loading.jsx";
import OrderService from "../../service/order.service.js";
import { useNavigate } from "react-router-dom";
import socket from "../../utilities/socket.config.js";

const Orders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    OrderService.getOrder(dispatch);
  }, []);
  useEffect(() => {
    // Faqat birinchi yuklanishda bildirishnoma uchun ruxsatni so'rash
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          console.log("Bildirishnomalar uchun ruxsatberildi");
        }
      });
    }
  }, []);

  useEffect(() => {
    socket.on("get_new_order", (newOrder) => {
      console.log("New order received:", newOrder);
      Notification.requestPermission().then((perm) => {
        if (perm == "granted") {
          const notification = new Notification("Yangi buyurtma", {
            body: "buyurtma",
            data: { hello: "Hello" },
            icon: "logo",
            tag: "Welcome message",
          });
          notification.addEventListener("error", (e) => {
            alert("error");
          });
        }
      });
    });

    socket.on("get_order_update", (updatedOrder) => {
      console.log("Order update received:", updatedOrder);

      showNotification(
        "Buyurtma yangilandi",
        `Buyurtma ID: ${updatedOrder._id}`
      );
    });

    return () => {
      socket.off("get_new_order");
      socket.off("get_order_update");
    };
  }, [socket, dispatch]);

  return isLoading ? (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <>
      <button className="btn btn-primary m-2" onClick={() => navigate("/home")}>
        <i className="bi bi-arrow-left"></i>
      </button>
      <div className="py-[60px] h-[100vh] overflow-x-hidden overflow-y-scroll">
        <div
          className={`row ${
            orders.length > 0
              ? orders?.filter((c) => c.payment == false).length > 0
                ? "container"
                : ""
              : ""
          }`}
        >
          {orders.length > 0 &&
          orders?.filter((c) => c.payment == false).length > 0 ? (
            orders
              ?.filter((c) => c.payment == false)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item) => (
                <div className="col-lg-3 col-md-4 mb-[60px] col-sm-6 col-12">
                  <OrderComponent item={item} />
                </div>
              ))
          ) : (
            <div className="w-[100vw] h-[50vh] flex items-center justify-center">
              {" "}
              <h2 className="font-nunito">Buyurtmalar Topilmadi</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
