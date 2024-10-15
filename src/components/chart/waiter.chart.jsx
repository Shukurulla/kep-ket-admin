import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import WaiterService from "../../service/waiter.service.js";
import OrderService from "../../service/order.service.js";
import TableService from "../../service/table.service.js";

const WaiterChart = ({ date }) => {
  const dispatch = useDispatch();

  // Fetch necessary data on initial load
  useEffect(() => {
    WaiterService.getWaiterService(dispatch);
    OrderService.getAllOrders(dispatch);
    TableService.getTables(dispatch);
  }, [dispatch]);

  const { orders } = useSelector((state) => state.order);

  // Helper function to get unique tables and their order counts
  const getUniqueWithCount = (arr) => {
    const result = [];

    arr.forEach((item) => {
      const found = result.find((el) => el.number === item.number);
      if (found) {
        found.repeat += 1;
      } else {
        result.push({ number: item.number, repeat: 1 });
      }
    });

    return result;
  };

  // Update the chart data whenever the `date` prop changes
  useEffect(() => {
    const uniqueArray = getUniqueWithCount(
      orders
        .filter(
          (c) =>
            new Date(c.createdAt).toLocaleDateString() ===
            new Date(date).toLocaleDateString()
        )
        .map((item) => {
          const data = {
            number: item.tableNumber.number,
          };
          return data;
        })
    );

    const barWidth = uniqueArray.length === 1 ? 10 : 70; // Adjust bar width for a single bar

    setChartState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Buyurtma soni",
          data: uniqueArray.map((item) => item.repeat),
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: uniqueArray.map((item) => `№${item.number}`),
        },
        plotOptions: {
          ...prevState.options.plotOptions,
          bar: {
            ...prevState.options.plotOptions.bar,
            barHeight: "50%", // Adjust bar height
            columnWidth: `${barWidth}%`, // Adjust column width based on the number of bars
          },
        },
        yaxis: {
          ...prevState.options.yaxis,
          max: (max) => Math.max(max + 1, 10), // Ensure some space at the top (e.g., 10)
        },
      },
    }));
  }, [date, orders]);

  // Chart state with initial empty data
  const [chartState, setChartState] = useState({
    series: [
      {
        name: "Buyurtma soni",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 80,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
          columnWidth: "70%", // Default column width for multiple bars
        },
      },

      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#BED1E6",
              colorTo: "#BED1E6",
              stops: [10, 100],
              opacityFrom: 1,
              opacityTo: 1,
            },
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val;
          },
        },
        max: (max) => Math.max(max + 2, 10), // Ensure space above bars
      },
      title: {
        floating: false,
        offsetY: 330,
        align: "left",
        style: {
          color: "#444",
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartState.options}
          series={chartState.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default WaiterChart;
