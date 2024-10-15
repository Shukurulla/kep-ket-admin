import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ShigimChart = ({ data }) => {
  // Ma'lumotlarni state orqali dinamik boshqaramiz
  const chartData = [["Officiant", 60]];

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: "",
      align: "center",
      verticalAlign: "middle",
      y: 20,
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
        size: "130%",
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
      <HighchartsReact highcharts={Highcharts} options={options} />

      <div className="flex items-center justify-center translate-y-[-50px] gap-5">
        <div className="flex items-center gap-3">
          <div className="w-[30px] rounded-[10px] h-[30px] bg-[#2CAFFE]"></div>
          <h1 className="text-[20px] font-[700] font-nunito text-[#2CAFFE]">
            Officiant
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ShigimChart;
