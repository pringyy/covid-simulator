import React, { useEffect, useState } from "react";

import BarChart from "./BarChart";
import { Grid } from "@material-ui/core";
import axios from "axios";

const DailyCases = (props) => {
  const { areas } = props;

  const [area1Cases, setArea1Cases] = useState({});
  const [area2Cases, setArea2Cases] = useState({});
  const [area3Cases, setArea3Cases] = useState({});

  const [dates, setDates] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const stripData = (res) => {
    let area = {cases:{}, deaths:{}};

    for (let i = 0; i < res.data.data.length; i++) {
      let data = res.data.data[i];
      area.cases[data.date] = data.cases.daily;
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
        'structure={"date":"date","name":"areaName","code":"areaCode","cases":{"daily":"newCasesBySpecimenDate","cumulative":"cumCasesBySpecimenDate"},"deaths":{"daily":"newDeaths28DaysByDeathDate","cumulative":"cumDeaths28DaysByDeathDate"}}';
      axios
        .get(endpoint)
        .then((res) => {
          let temp = stripData(res)

          switch (i + 1) {
            case 1:
              setArea1Cases(temp.cases);
              break;
            case 2:
              setArea2Cases(temp.cases);
              break;
            case 3:
              setArea3Cases(temp.cases);
              break;
          }
          setLoaded(true);
        })
        .catch(() => setError(true));
    });
  }, [areas]);

  useEffect(() => {
    setDates(intersection(area1Cases, area2Cases, area3Cases));
  }, [area1Cases, area2Cases, area3Cases]);

  return (
    <>
      {loaded ? (
        <>
          <h1>Daily Cases</h1>

          <Grid container spacing={1}> 
            <Grid item xs={12} md={4}>
              <BarChart data={area1Cases} area={areas[2]} type={'cases'} color={'#008FFB'} group={'dailyCases'} id={'graph1'} dates={dates} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BarChart data={area2Cases} area={areas[1]} type={'cases'} color={'#00E396'} group={'dailyCases'} id={'graph2'} dates={dates} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BarChart data={area3Cases} area={areas[0]} type={'cases'} color={'#FEB019'} group={'dailyCases'} id={'graph3'} dates={dates} />
            </Grid>
          </Grid>
        </>
      ) : error ? (
        <p>No data available.</p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default DailyCases;
