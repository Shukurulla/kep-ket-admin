import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Toast from "./components/toast/toast";
import Layaout from "./pages/layaout";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import UserService from "./service/user.service";
import WaiterService from "./service/waiter.service";
import TableService from "./service/table.service";
import CategoryService from "./service/category.service";
import PromoCodeService from "./service/promocode.service";
import DishService from "./service/dish.service";
import Dish from "./pages/dish/dish";
import Create from "./components/foodDetails/create";
import EditDish from "./components/foodDetails/edit";
import Tables from "./pages/table/tables";
import Promocode from "./pages/promocode/promocode";
import Category from "./pages/category/category";
import Orders from "./pages/orders/orders";
import axios from "./service/api";
import OrderService from "./service/order.service";
import Loading from "./components/loading/loading.jsx";
import Home from "./pages/home/home.jsx";
import Report from "./pages/report/report.jsx";
import Waiters from "./pages/waiter/waiters.jsx";
import Kassa from "./pages/kassa/kassa.jsx";

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, []);
};

const App = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      UserService.getUser(dispatch, navigate);
      WaiterService.getWaiters(dispatch);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-[100vw] overflow-x-hidden relative">
      <Toast />
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/report" element={<Layaout activPage={<Report />} />} />
        <Route path="/home" element={<Layaout activPage={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kassa" element={<Kassa />} />
        <Route path="/dish" element={<Layaout activPage={<Dish />} />} />
        <Route path="/add-food" element={<Layaout activPage={<Create />} />} />
        <Route
          path="/edit-food/:id"
          element={<Layaout activPage={<EditDish />} />}
        />
        <Route path="/tables" element={<Layaout activPage={<Tables />} />} />
        <Route path="/waiters" element={<Layaout activPage={<Waiters />} />} />
        <Route
          path="/promocodes"
          element={<Layaout activPage={<Promocode />} />}
        />
        <Route
          path="/category"
          element={<Layaout activPage={<Category />} />}
        />
        <Route path="/orders" element={<Orders />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
