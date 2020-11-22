import React, { useEffect, useState } from "react";

import BarChart from "./BarChart";
import { Grid } from "@material-ui/core";
import LineGraph from "./LineGraph";
import axios from "axios";

const Data = (props) => {
  const { area } = props;

  const [cases, setCases] = useState({ daily: [], cumulative: [] });
  const [deaths, setDeaths] = useState({ daily: [], cumulative: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false)

  const endpoint =
    "https://api.coronavirus.data.gov.uk/v1/data?" +
    `filters=areaType=ltla;areaName=${area}&` +
    'structure={"date":"date","name":"areaName","code":"areaCode","cases":{"daily":"newCasesBySpecimenDate","cumulative":"cumCasesBySpecimenDateRate"},"deaths":{"daily":"newDeathsByDeathDate","cumulative":"cumDeathsByDeathDate"},"covidOccupiedMVBeds":"covidOccupiedMVBeds"}';

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        // get data in correct format for graphs
        for (let i = 0; i < res.data.data.length; i++) {
          let data = res.data.data[i];

          setDeaths((prevDeaths) => {
            prevDeaths.daily[data.date] = data.deaths.daily;
            return { ...prevDeaths };
          });

          setDeaths((prevDeaths) => {
            prevDeaths.cumulative[data.date] = data.deaths.cumulative;
            return { ...prevDeaths };
          });

          setCases((prevCases) => {
            prevCases.daily[data.date] = data.cases.daily;
            return { ...prevCases };
          });

          setCases((prevCases) => {
            prevCases.cumulative[data.date] = data.cases.cumulative;
            return { ...prevCases };
          });
        }
        setLoaded(true);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <>
      {loaded ? (
        <Grid container spacing={1}>
          <BarChart data={deaths.daily} area={area} type="Deaths" />
          <LineGraph data={deaths.cumulative} area={area} type="Deaths" />

          <BarChart data={cases.daily} area={area} type="Cases" />
          <LineGraph data={cases.cumulative} area={area} type="Cases" />

          {/* <PieChart data={data} area={area} /> */}
        </Grid>
      ) : error? <p>No data available for {area}</p> :(
        <p>loading...</p>
      )}
    </>
  );
};

export default Data;
