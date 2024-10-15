import React, { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BrowserShareChart = ({ naqt, plastik }) => {
  const chartRef = useRef(null);

  const chartData = [
    ["Naqt to'lem", naqt],
    ["Plastik to'lem", plastik],
  ];

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      events: {
        load: function () {
          // Disable animations after the initial render
          this.series[0].update({
            animation: false,
          });
        },
      },
    },
    title: {
      text: "",
      align: "center",
      verticalAlign: "middle",
      y: 0,
      style: {
        fontSize: "2.1em",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "120%",
        animation: {
          duration: 1500, // Set a specific duration for the initial animation
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Kirim",
        innerSize: "50%",
        data: chartData,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />

      <div className="flex items-center justify-center translate-y-[-50px] gap-5">
        <div className="flex items-center gap-3">
          <div className="w-[30px] rounded-[10px] h-[30px] bg-[#2CAFFE]"></div>
          <h1 className="text-[20px] font-[700] font-nunito text-[#2CAFFE]">
            Naqt to'lem
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[30px] rounded-[10px] h-[30px] bg-[#544FC4]"></div>
          <h1 className="text-[20px] font-[700] font-nunito text-[#544FC4]">
            Plastik to'lem
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BrowserShareChart;
