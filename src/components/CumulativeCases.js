import React, { useEffect, useState } from "react";

import LineGraph from "./LineGraph";
import axios from "axios";

const CumulativeCases = (props) => {
  const { areas } = props;

  const [area1, setArea1] = useState({});
  const [area2, setArea2] = useState({});
  const [area3, setArea3] = useState({});
  const [dates, setDates] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const stripData = (res) => {
    let area = {};

    for (let i = 0; i < res.data.data.length; i++) {
      let data = res.data.data[i];
      area[data.date] = data.cases.cumulative;
    }
    return area;
  };

  const intersection = (o1, o2, o3) => {
    return Object.keys(o1)
      .filter({}.hasOwnProperty.bind(o2))
      .filter({}.hasOwnProperty.bind(o3));
  };

  useEffect(() => {
    areas.map((area, i) => {
      const endpoint =
        "https://api.coronavirus.data.gov.uk/v1/data?" +
        `filters=areaType=ltla;areaName=${area}&` +
        'structure={"date":"date","name":"areaName","code":"areaCode","cases":{"daily":"newCasesBySpecimenDate","cumulative":"cumCasesBySpecimenDateRate"},"deaths":{"daily":"newDeathsByDeathDate","cumulative":"cumDeathsByDeathDate"}}';

      axios
        .get(endpoint)
        .then((res) => {
          switch (i + 1) {
            case 1:
              setArea1(stripData(res));
              break;
            case 2:
              setArea2(stripData(res));
              break;
            case 3:
              setArea3(stripData(res));
              break;
          }
          setLoaded(true);
        })
        .catch(() => setError(true));
    });
  }, [areas]);

  useEffect(() => {
    setDates(intersection(area1, area2, area3));
    console.log("DatesEffect");
  }, [area1, area2, area3]);

  useEffect(() => {
    Object.keys(area1).forEach((key) => {
      if (!dates.includes(key)) {
        // console.log(key);
        setArea1((prevArea) => {
          delete prevArea[key];
          return prevArea;
        });
      }
    });

    Object.keys(area2).forEach((key) => {
      if (!dates.includes(key)) {
        // console.log(key);
        setArea2((prevArea) => {
          delete prevArea[key];
          return prevArea;
        });
      }
    });

    Object.keys(area3).forEach((key) => {
      if (!dates.includes(key)) {
        // console.log(key);
        setArea3((prevArea) => {
          delete prevArea[key];
          return prevArea;
        });
      }
      console.log("Areas Effect");
    });
  }, [dates]);

  return (
    <>
      {loaded ? (
        <LineGraph area1={area1} area2={area2} area3={area3} dates={dates} />
      ) : error ? (
        <p>No data available.</p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CumulativeCases;
