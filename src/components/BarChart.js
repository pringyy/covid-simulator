import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = (props) => {
  const { data, area, type } = props;

  const stripData = (data) => {
    let dates = [],
      dailyCases = [],
      dailyDeaths = [];

    for (let i = 0; i < data.length; i++) {
      dates.push(data[i].date);

      if (type === "Cases") {
        dailyCases.push(data[i].cases.daily);
      } else {
        dailyDeaths.push(data[i].deaths.daily);
      }
    }
    return [dates, dailyCases, dailyDeaths];
  };

  const [dates, dailyCases, dailyDeaths] = stripData(data);

  const chart = {
    series: [
      {
        name: "Daily " + type,
        data: type === "Cases" ? dailyCases.reverse() : dailyDeaths.reverse(),
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
          minHeight: 50,
          maxHeight: 100,
        },
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Number of " + type,
        },
      },
      fill: {
        opacity: 1,
      },
      title: {
        text: "Daily COVID-19 " + type + " in " + area,
        align: "center",
      },

      tooltip: {
        y: {
          formatter: (val) => {
            return val + " " + type;
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
