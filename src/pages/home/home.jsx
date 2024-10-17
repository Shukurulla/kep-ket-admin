import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActivePage } from "../../slice/ui.js";
import WaiterBox from "../../components/waiter/waiter-box.jsx";
import WaiterChart from "../../components/chart/waiter.chart.jsx";
import WaiterService from "../../service/waiter.service.js";
import DatePicker from "../../DataPicker.jsx";
import ApexChart from "../../components/chart/report.chart.jsx";
import KassaService from "../../service/kassa.service.js";
import BrowserShareChart from "../../components/chart/report.chart.jsx";
import ShigimChart from "../../components/chart/shigim.chart.jsx";
import filterOrdersByPeriod from "../../utilities/sortArrayDate.js";

const Home = () => {
  const dispatch = useDispatch();
  const { waiters, waiterServiceInfo } = useSelector((state) => state.waiter);
  const { orders } = useSelector((state) => state.order);
  const report = useSelector((state) => state.kassa);
  const [dateParam, setDateParam] = useState("Bir Kun");
  const reports = filterOrdersByPeriod(report.reports, dateParam);
  const [showParam, setShowParam] = useState(false);

  const f = new Intl.NumberFormat("es-sp");
  // Initialize the state with the current date
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [typeReport, setTypeReport] = useState("kirim");
  useEffect(() => {
    setShowParam(false);
  }, [dateParam]);

  const getUniqueWithCount = (arr, order) => {
    const findOrders = arr.filter((c) => c.id == order.id);
    const length = findOrders.length;
    const totalPrice = order.price * length;
    return { order, totalPrice, length };
  };
  const orderCounter = orders
    .map((item) => item.items.map((food) => food))
    .flat()
    .map((item) => item.dish);

  const uniqueOrders = orderCounter
    .map((item) => getUniqueWithCount(orderCounter, item))
    .filter(
      (order, index, self) =>
        index === self.findIndex((o) => o.order.id === order.order.id)
    )
    .sort((a, b) => b.length - a.length);

  useEffect(() => {
    dispatch(changeActivePage("Bosh sahifa"));
    WaiterService.getWaiterService(dispatch);
    WaiterService.getWaiters(dispatch);
    KassaService.getKassa(dispatch);
  }, []);

  const reportSchema = reports.map((item) => {
    const data = { type: item.paymentType, price: item.totalPrice };
    return data;
  });

  const plastik = reportSchema.filter((c) => c.type == "Plastik");
  const naqt = reportSchema.filter((c) => c.type == "Naqt");

  const plastikSum = plastik.reduce((sum, item) => sum + item.price, 0);
  const naqtSum = naqt.reduce((sum, item) => sum + item.price, 0);
  const totalSum = reportSchema.reduce((sum, item) => sum + item.price, 0);
  const forWaiter = reports
    .map((item) => item.forWaiter)
    .reduce((sum, item) => sum + item, 0);

  const percent = [
    +((naqtSum * 100) / totalSum).toFixed(),
    +((plastikSum * 100) / totalSum).toFixed(),
  ];

  return (
    <div className="md:p-3 lg:py-[20px] py-[30px] px-[10px]">
      <h4 className="font-nunito page-label font-[600]">Bosh sahifa</h4>
      <p className="font-nunito page-path pt-1">Bosh sahifa /</p>
      <div className="waiters my-3">
        <div className="row">
          {waiterServiceInfo.slice(0, 3).map((item) => (
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <WaiterBox waiter={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="row statistika">
        <div className="col-lg-8 col-md-8 col-sm-12">
          <div className="p-4 shadow rounded-[15px] bg-white">
            <div className="">
              <div className="flex items-center justify-between">
                <h1 className="font-[700] text-[20px]">Stollar statistikasi</h1>
                <div className="">
                  <DatePicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
              </div>
              <WaiterChart date={selectedDate} />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="dish shadow bg-white p-[16px] rounded-[15px] ">
            <h1 className="font-[700] text-[20px]">Top buyurtma</h1>
            {uniqueOrders.slice(0, 4).map((item) => (
              <div className="bg-white py-3 border-b-[#CDD0D5] border-b-[1px]  relative ">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                    <img
                      src={item.order?.image}
                      className="w-[70px] h-[70px] object-cover rounded-[15px]"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-8 pl-0 col-md-8 col-sm-8 col-8">
                    <h1 className="text-[15px] font-[700] font-nunito text-[#000000]">
                      {item.order.name}
                    </h1>

                    <div className="flex waiters-center mt-2 justify-between">
                      <span className="font-nunito text-[14px] font-[600] text-[#14161B80]">
                        Sotilgan soni::{" "}
                      </span>
                      <span className="font-nunito text-[12px] font-[700]">
                        {item.length}
                      </span>
                    </div>
                    <div className="flex waiters-center mt-1 justify-between">
                      <span className="font-nunito text-[#14161B80] text-[14px] font-[600]">
                        Umumiy foyda:{" "}
                      </span>
                      <span className="font-nunito text-[12px] font-[700]">
                        {f.format(item.totalPrice)} sum
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="reports mt-3 rounded-[20px] ">
          <div className="flex relative  bg-[#FFFFFF52] p-[20px] rounded-tl-[20px] rounded-tr-[20px] justify-between items-center">
            <div className="config flex gap-[20px] items-center">
              <div
                onClick={() => setTypeReport("kirim")}
                className="bg-white rounded-[20px] z-40 relative text-[20px] font-[600] px-[50px] py-[15px] rounded-tl-[20px] rounded-tr-[20px]  cursor-pointer"
              >
                Kirim
                <div
                  className={`d-${typeReport == "kirim" ? "block" : "none"}`}
                >
                  <div className="absolute w-[100%] h-100 bg-white bottom-[-70%] left-0"></div>
                  <div className="bg-[#F6F8FD]  w-[20px] translate-x-[15px] z-20 flex items-end right-[-4px] h-[35px] bottom-[-20px] rounded-bl-[30px] rounded-[20px] absolute"></div>
                  <div className="w-[20px] h-[20px] right-[-10px] bottom-[-20px] bg-[#fff] absolute z-10"></div>
                </div>
              </div>
              <div
                onClick={() => setTypeReport("shigim")}
                className="bg-white relative  text-[20px] font-[600] px-[50px] py-[15px] rounded-[20px] rounded-tl-[20px] rounded-tr-[20px] cursor-pointer"
              >
                Shig'im
                <div
                  className={`d-${typeReport == "shigim" ? "block" : "none"}`}
                >
                  <div className="absolute w-[100%] h-100 bg-white bottom-[-80%] left-0"></div>
                  <div className="bg-[#F6F8FD]  w-[30px] translate-x-[-30px] left-0 z-20 flex items-end h-[35px] bottom-[-20px] rounded-bl-[20px] rounded-[20px] absolute"></div>
                  <div className="w-[20px] h-[20px] left-[-10px] bottom-[-20px] bg-[#ffffff] absolute z-10"></div>
                  <div className="bg-[#F6F8FD]  w-[30px] translate-x-[25px] z-20 flex items-end right-[-4px] h-[35px] bottom-[-20px] rounded-bl-[20px] rounded-[20px] absolute"></div>
                  <div className="w-[20px] h-[20px] right-[-10px] bottom-[-20px] bg-[#fff] absolute z-10"></div>
                </div>
              </div>
            </div>
            <div className="option bg-[#f1f4fb] pb-[15px] pl-[15px]   rounded-bl-[20px] absolute right-0 top-0">
              <div className="relative w-[100%]">
                <div className=" w-[50px] z-20 bg-[#F6F8FD] h-[30px] absolute  rounded-[20px] top-[0px] left-[-65px]"></div>
                <div className=" w-[20px] z-10 bg-[#f1f4fb] h-[20px] absolute  rounded-[20px] top left-[-25px] top-[-10px]"></div>
              </div>
              <div
                onClick={() => setShowParam(!showParam)}
                className="navigator cursor-pointer px-[30px]  text-[18px] text-center font-[600] bg-[#F6F8FD] py-[15px] rounded-[20px]"
              >
                {dateParam}
              </div>
              <div
                className={`selected rounded-[20px] d-${
                  showParam ? "block" : "none"
                } bg-white w-[150px] left-[-20%] p-3 z-50 absolute`}
              >
                <div
                  onClick={() => setDateParam("Bir Kun")}
                  className="cursor-pointer text-[18px] text-center font-[600] pb-2 "
                >
                  Bir Kun
                </div>
                <div
                  onClick={() => setDateParam("Bir Ha'pte")}
                  className="cursor-pointer text-[18px] text-center font-[600] pb-2 "
                >
                  Bir Ha'pte
                </div>
                <div
                  onClick={() => setDateParam("Bir Ay")}
                  className="cursor-pointer text-[18px] text-center font-[600] pb-2 "
                >
                  Bir Ay
                </div>
                <div
                  onClick={() => setDateParam("Bir Jil")}
                  className="cursor-pointer text-[18px] text-center font-[600] pb-2 "
                >
                  Bir Jil
                </div>
              </div>
              <div className="relative w-[100%]">
                <div className=" w-[50px] z-20 bg-[#F6F8FD] h-[30px] absolute  rounded-[20px] bottom-[-45px] right-[0]"></div>
                <div className=" w-[20px] z-10 bg-[#f1f4fb] h-[20px] absolute  rounded-[20px]  right-[0] bottom-[-30px]"></div>
              </div>
            </div>
          </div>
          {typeReport == "kirim" ? (
            <div className="px-[20px]  bg-[#FFFFFF52]">
              <div className="bg-white rounded-[20px]">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-12 p-3">
                    <h1 className="px-3 py-3 text-[30px] font-[600]">
                      Jami kirim: {f.format(totalSum)}sum
                    </h1>
                    <BrowserShareChart naqt={percent[0]} plastik={percent[1]} />
                  </div>
                  <div className="col-lg-3 mx-auto col-md-4 col-sm-12">
                    <div className="price-box my-3 rounded-[12px] text-center text-[30px] font-[600] font-nunito text-[#544FC4] w-[100%] px-[50px] py-[40px] bg-[#0129700A]">
                      {f.format(plastikSum)}
                    </div>
                    <div className="price-box my-3 rounded-[12px] text-center text-[30px] font-[600] font-nunito text-[#2CAFFE] w-[100%] px-[50px] py-[40px] bg-[#0129700A]">
                      {f.format(naqtSum)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-[20px]  bg-[#FFFFFF52]">
              <div className="bg-white rounded-[20px]">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-12 py-3">
                    <ShigimChart />
                  </div>
                  <div className="col-lg-3 mx-auto col-md-4 col-sm-12">
                    <div className="price-box my-3 rounded-[12px] text-center text-[30px] font-[600] font-nunito text-[#2CAFFE] w-[100%] px-[50px] py-[40px] bg-[#0129700A]">
                      {f.format(forWaiter)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
