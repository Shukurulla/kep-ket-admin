import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderComponent from "../../components/orderComponent.jsx";
import Loading from "../../components/loading/loading.jsx";
import OrderService from "../../service/order.service.js";
import { useNavigate } from "react-router-dom";
import KassaService from "../../service/kassa.service.js";
import { getOrderStart } from "../../slice/orders.slice.js";

const Kassa = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const [showPayment, setShowPayment] = useState(false);
  const [item, setItem] = useState({});
  const kassa = useSelector((state) => state.kassa);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const f = new Intl.NumberFormat("us-sp");

  useEffect(() => {
    KassaService.getKassa(dispatch);
    OrderService.getOrder(dispatch);
  }, []);

  const paymentHandler = async (item, type) => {
    const kassaSchema = {
      orderId: item._id,
      table: {
        number: item.tableNumber.number,
        id: item.tableNumber.id,
      },
      waiter: {
        name: item.waiter.name,
        id: item.waiter.id,
      },
      meals: item.items,
      totalPrice: item.totalPrice,
      forWaiter: item.totalPrice * 0.1,
      restaurantId: localStorage.getItem("userId"),
      paymentType: type,
    };
    await KassaService.postKassa(dispatch, kassaSchema);
    await OrderService.getOrder(dispatch);
    setShowPayment(false);
    try {
    } catch (error) {
      console.log(error);
    }
    OrderService.getOrder(dispatch);
  };

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
        {!showPayment ? (
          ""
        ) : (
          <div className="absolute w-[100vw] h-[90vh] top-0 left-0 z-[999] flex items-center justify-center">
            <div
              className="detail absolute w-[100vw] h-[90vh] top-0 left-0 z-888 bg-[#f1f4fbc2]"
              onClick={() => setShowPayment(false)}
            ></div>
            <div className="p-4 bg-white w-[50%] rounded-lg relative z-[999]">
              <i
                className="absolute bi bi-x-lg top-3 right-3 cursor-pointer text-xl "
                onClick={() => setShowPayment(false)}
              ></i>
              <h1 className="font-nunito text-[30px]">
                <b>{item.tableNumber.number}-stol</b>{" "}
                <small className="font-nunito text-[15px]">
                  vaqti: {new Date(item.createdAt).toLocaleDateString()},{" "}
                  {new Date(item.createdAt)
                    .toLocaleTimeString()
                    .slice(
                      0,
                      new Date(item.createdAt).toLocaleTimeString().length - 3
                    )}
                </small>
              </h1>
              <div className="foods">
                {item.items.map((food) => (
                  <div className="flex items-center font-nunito mt-2 justify-between">
                    <span>{food.dish.name}</span>
                    <span>
                      {f.format(food.dish.price)} {food.quantity}x
                    </span>
                  </div>
                ))}
              </div>
              <div className="waiter">
                <h1 className="flex items-center justify-between font-nunito text-[20px] my-3">
                  <span>
                    Ofitsiyant <b>{item.waiter.name}</b> uchun:
                  </span>
                  <span>{f.format(item.totalPrice * 0.1)} som</span>
                </h1>
              </div>
              <h3 className="font-nunito flex items-center justify-between my-2 text-[20px] font-[700]">
                <span>Jami hisob:</span>{" "}
                <span>{f.format(item.totalPrice)} som</span>
              </h3>
              <div className="buttons flex gap-2">
                <button
                  className="btn btn-outline-primary"
                  disabled={kassa.isLoading}
                  onClick={() => paymentHandler(item, "Naqt")}
                >
                  Naqt to'lash
                </button>
                <button
                  disabled={kassa.isLoading}
                  className="btn btn-primary"
                  onClick={() => paymentHandler(item, "Plastik")}
                >
                  Plastik karta orqali to'lash
                </button>
              </div>
            </div>
          </div>
        )}
        <div
          className={`row  relative ${
            orders.filter((c) => c.payment == false).length > 0
              ? "container"
              : ""
          }`}
        >
          {orders.filter((c) => c.payment == false).length > 0 ? (
            orders
              .filter((c) => c.payment == false)
              .map((item) => (
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="relative bg-white p-4  rounded-[30px]">
                    <div className="waiter-name absolute top-[0] left-[50%] font-nunito translate-x-[-50%] translate-y-[-50%] bg-[#EDF2F6] p-2 rounded-[10px] border-[1px] border-[#000] ">
                      <p className="font-[700]"> {item.waiter.name}</p>
                    </div>
                    <div className="order-header mt-3 flex items-center justify-between">
                      <div className="table-number p-[20px] bg-[#EDF2F6] rounded-[20px] text-[20px] font-[700] border-[1px] border-[#DEE2E6]">
                        №{item.tableNumber.number}
                      </div>
                      <div className="font-nunito font-[600]">
                        {new Date(item.createdAt).toLocaleDateString()},{" "}
                        {new Date(item.createdAt)
                          .toLocaleTimeString()
                          .slice(
                            0,
                            new Date(item.createdAt).toLocaleTimeString()
                              .length - 3
                          )}
                      </div>
                    </div>

                    <div className="orders">
                      {item.items.map((food) => (
                        <div className="flex items-center font-nunito mt-2 justify-between">
                          <span>{food.dish.name}</span>
                          <span>
                            {f.format(food.dish.price)} {food.quantity}x
                          </span>
                        </div>
                      ))}
                    </div>
                    <h3 className="font-nunito flex items-center justify-between my-2 text-[20px] font-[700]">
                      <span>Jami hisob:</span>{" "}
                      <span>{f.format(item.totalPrice)} som</span>
                    </h3>
                    <div className="flex items-center justify-center">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setItem(item);
                          setShowPayment(true);
                        }}
                      >
                        To'lash
                      </button>
                    </div>
                  </div>
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

export default Kassa;
