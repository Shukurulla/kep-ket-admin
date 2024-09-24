import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderComponent from "../../components/orderComponent.jsx";
import Loading from "../../components/loading/loading.jsx";
import OrderService from "../../service/order.service.js";

const Orders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    OrderService.getOrder(dispatch);
  }, []);

  return isLoading ? (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <div className=" py-[60px] h-[100vh] overflow-x-hidden overflow-y-scroll">
      <div className="row container">
        {orders.map((item) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <OrderComponent item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
