import { configureStore } from "@reduxjs/toolkit";
import UiReducer from "../slice/ui.js";
import UserReducer from "../slice/user.slice.js";
import WaiterReducer from "../slice/waiter.slice.js";
import OrderReducer from "../slice/orders.slice.js";
import TableReducer from "../slice/table.slice.js";
import DishReducer from "../slice/dish.slice.js";
import CategoryReducer from "../slice/category.slice.js";
import PromocodeReducer from "../slice/promocode.slice.js";
import KassaReducer from "../slice/kassa.slice.js";

const store = configureStore({
  reducer: {
    ui: UiReducer,
    user: UserReducer,
    waiter: WaiterReducer,
    order: OrderReducer,
    table: TableReducer,
    dish: DishReducer,
    category: CategoryReducer,
    promocode: PromocodeReducer,
    kassa: KassaReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
