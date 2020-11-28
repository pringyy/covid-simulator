import React from "react";
import ReactApexChart from "react-apexcharts";

const LineGraph = (props) => {
  const { area1, area2, area3, dates, areas, id } = props;

  const mergeArrays = (...arrays) => {
    let jointArray = [];

    arrays.forEach((array) => {
      jointArray = [...jointArray, ...array];
    });
    const uniqueArray = jointArray.reduce((newArray, item) => {
      if (newArray.includes(item)) {
        return newArray;
      } else {
        return [...newArray, item];
      }
    }, []);
    return uniqueArray;
  };

  const chart = {
    series: [
      {
        name: areas[0],
        data: Object.values(area1),
      },
      {
        name: areas[1],
        data: Object.values(area2),
      },
      {
        name: areas[2],
        data: Object.values(area3),
      },
    ],
    options: {
      chart: {
              title:{text: id},

        id:id,
        group: 'common',
        type: "line",
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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
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
      // yaxis: {
      //   title: {
      //     text: "Number of Cases",
      //   },
      // },
      // fill: {
      //   opacity: 40,
      // },
      // title: {
      //   text: "Cumulative COVID-19 Cases",
      //   align: "center",
      // },

      tooltip: {
        shared: true,
        // intersect: false,
        // y: {
        //   formatter: (val) => {
        //     return val + " cases";
        //   },
        // },

        x: {
          format: "dd/MM/yy",
        },
      },
    },
  };

  return (
    <>
      {/* {chart.series[0].data.every((element) => element === null) ? (
        <p>
          No cumulative data available for {type.toLowerCase()} in {area}.
        </p>
      ) : (
        <ReactApexChart
          options={chart.options}
          series={chart.series}
          type="area"
          height={350}
          // width={350}
        />
      )} */}
      <ReactApexChart
        options={chart.options}
        series={chart.series}
        type="area"
        height={350}
        // width={350}
      />
    </>
  );
};

export default LineGraph;
