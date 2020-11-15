import React from "react";
import ReactApexChart from "react-apexcharts";

const stripData = (data) => {
  let dates = [],
    dailyCases = [];

  for (let i = 0; i < data.length; i++) {
    dates.push(data[i].date);
    dailyCases.push(data[i].cases.daily);
  }
  return [dates, dailyCases];
};

const BarChart = (props) => {
  const { data } = props;

  const [dates, dailyCases] = stripData(data);

  const chart = {
    series: [
      {
        name: "Daily Cases",
        data: dailyCases.reverse(),
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: dates.reverse(),
        type: "datetime",
        labels: {
          format: "MMM yy",
        },
      },
      yaxis: {
        title: {
          text: "Daily Cases",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return val + " cases";
          },
        },
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chart.options}
        series={chart.series}
        type="bar"
        height={350}
        width={350}
      />
    </div>
  );
};

export default BarChart;
