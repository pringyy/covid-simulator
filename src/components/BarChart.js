import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = (props) => {
  const { data, area, type ,color, group, id, dates} = props;
  const chart = {
    series: [
      {
        name: "Daily " + type,
        data: Object.values(data),
      },
    ],
    options: {
      colors :[color],
      chart: {
        group: group,
        id: id,
        type: "bar",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        animations: {
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
        colors: [color],
      },
      xaxis: {
        categories: dates,
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
        labels:{
          minWidth: 0
        }
      },
      fill: {
        opacity: 1,
      },
      title: {
        text: area,
        align: "center",
      },

      tooltip: {
        y: {
          formatter: (val) => {
            return val + " " + type;
          },
        },
        marker:{
          show :true
        }
      },
    },
  };

  return (
    <>
      {chart.series[0].data.every((element) => element === null) ? (
        <p>
          No daily data available for {type.toLowerCase()} in {area}.
        </p>
      ) : (
        <ReactApexChart
          options={chart.options}
          series={chart.series}
          type="bar"
          height={350}
          // width={350}
        />
      )}
    </>
  );
};

export default BarChart;

