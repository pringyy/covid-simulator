import React from "react";
import ReactApexChart from "react-apexcharts";

const LineGraph = (props) => {
  const { data, area, type } = props;

  const stripData = (data) => {
    let dates = [],
      cases = [],
      deaths = [];

    for (let i = 0; i < data.length; i++) {
      dates.push(data[i].date);

      if (type === "Cases") {
        cases.push(data[i].cases.cumulative);
      } else {
        deaths.push(data[i].deaths.cumulative);
      }
    }
    return [dates, cases, deaths];
  };

  const [dates, cases, deaths] = stripData(data);

  const chart = {
    series: [
      {
        name: "Cumulative " + type,
        data: type === "Cases" ? cases.reverse() : deaths.reverse(),
      },
    ],
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
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
        text: "Cumulative COVID-19 " + type + " in " + area,
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
        type="line"
        height={350}
        width={350}
      />
    </div>
  );
};

export default LineGraph;
