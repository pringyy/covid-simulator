import React, { useEffect, useState } from "react";

import LineGraph from "./LineGraph";
import axios from "axios";

const CumulativeCases = (props) => {
  const { areas } = props;

  const [area1Cases, setArea1Cases] = useState({});
  const [area2Cases, setArea2Cases] = useState({});
  const [area3Cases, setArea3Cases] = useState({});

  const [area1Deaths, setArea1Deaths] = useState({});
  const [area2Deaths, setArea2Deaths] = useState({});
  const [area3Deaths, setArea3Deaths] = useState({});

  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [loaded3, setLoaded3] = useState(false);

  const [dates, setDates] = useState([]);
  const [error, setError] = useState(false);

  const stripData = (res) => {
    let area = {cases:{}, deaths:{}};

    for (let i = 0; i < res.data.data.length; i++) {
      let data = res.data.data[i];
      area.cases[data.date] = data.cases.cumulative;
      area.deaths[data.date] = data.deaths.cumulative;
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
              setArea1Deaths(temp.deaths);
              setLoaded1(true);
              break;
            case 2:
              setArea2Cases(temp.cases);
              setArea2Deaths(temp.deaths);
              setLoaded2(true);
              break;
            case 3:
              setArea3Cases(temp.cases);
              setArea3Deaths(temp.deaths);
              setLoaded3(true);
              break;
            default:
              break;
          }
        })
        .catch(() => setError(true));
    });
  }, [areas]);

  useEffect(() => {
    setDates(intersection(area1Cases, area2Cases, area3Cases));
  }, [area1Cases, area2Cases, area3Cases]);

  return (
    <>
      {loaded1 && loaded2 && loaded3 ? (
        <>
          <h3>Cumulative Cases</h3>
          <LineGraph area1={area1Cases} area2={area2Cases} area3={area3Cases} dates={dates} areas={areas} id={'Cases'} type="cases" />
          
          <h3>Cumulative Deaths</h3>
          <LineGraph area1={area1Deaths} area2={area2Deaths} area3={area3Deaths} dates={dates} areas={areas} id={'Deaths'} type="deaths" />
        </>
      ) : error ? (
        <p>No data available.</p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CumulativeCases;
