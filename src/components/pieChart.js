import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = (props) => {
  const { data, area } = props;

  const chart = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chart.options}
        series={chart.series}
        type="pie"
        width={380}
      />
    </div>
  );
};

export default PieChart;
