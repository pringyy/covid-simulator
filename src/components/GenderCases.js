import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import RadarChart from "./RadarChart";
import axios from "axios";

const GenderCases = (props) => {

  const [maleData, setMaleData] = useState([]);
  const [femaleData, setFemaleData] = useState([]);
  const [ages, setAges] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const stripData = (res) => {
    let ageBands = [];
    let maleResults = [];
    let femaleResults = [];

    for (let i = 0; i < res.data.data.length; i++) {
      let data = res.data.data[i];

      res.data.data[i].maleCases.sort((a,b) => (parseInt(a.age.substring(0,2),10) - parseInt(b.age.substring(0,2),10)))
      res.data.data[i].femaleCases.sort((a,b) => (parseInt(a.age.substring(0,2),10) - parseInt(b.age.substring(0,2),10)))
      
      let maleSeries = [];
      let femaleSeries = [];

      for (let j = 0; j < data.maleCases.length; j++) {
        let cases = data.maleCases[j];
        let formattedAge = cases.age.replace("_to_", "-"); 

        if (!ageBands.includes(formattedAge)) {
          ageBands.push(formattedAge);
        }
        maleSeries.push(cases.value);
      }

      for (let j = 0; j < data.femaleCases.length; j++) {
        let cases = data.femaleCases[j];
        femaleSeries.push(cases.value);
      }

      maleResults.push({name: data.name, data: maleSeries});
      femaleResults.push({name: data.name, data: femaleSeries});
    }
    return [ageBands, maleResults, femaleResults];
  };

  useEffect(() => {
    const endpoint =
      "https://api.coronavirus.data.gov.uk/v1/data?" +
      `filters=areaType=region;date=2020-11-25&` +
      'structure={"date":"date","name":"areaName","maleCases":"maleCases","femaleCases":"femaleCases"}';
    
      axios
      .get(endpoint)
      .then((res) => {
        let [ageBands, maleResults, femaleResults] = stripData(res);
        
        setMaleData(maleResults);
        setFemaleData(femaleResults);

        setAges(ageBands);
        setLoaded(true);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <>
      {loaded ? (
        <>
          <Grid container spacing={1}> 
            <Grid item xs={12} md={6}>
              <h3>Male Cases by Age</h3>
              <RadarChart id="male" data={maleData} ages={ages} />
            </Grid>
            <Grid item xs={12} md={6}>
              <h3>Female Cases by Age</h3>
              <RadarChart id="female" data={femaleData} ages={ages} />
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

export default GenderCases;
