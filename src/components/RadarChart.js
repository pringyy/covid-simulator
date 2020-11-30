import React from "react";
import ReactApexChart from "react-apexcharts";

const RadarChart = (props) => {
  const { id, data, ages } = props;

  const chart = {
    series: data,
    options: {
      chart: {
        id: id,
        height: 400,
        type: "radar",
        group: "gender",
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      xaxis: {
        categories: ages,
      },
      yaxis: [
        {
          forceNiceScale: true,
          min: 0,
          max: 16000,
        },
      ],
      tooltip: {
        y: {
          show: true,
          formatter: (value) => {
            return value + " cases";
          },
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={chart.options}
      series={chart.series}
      type="radar"
      height={400}
    />
  );
};

export default RadarChart;
