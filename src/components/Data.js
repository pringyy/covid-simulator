import { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./BarChart";

const Data = (props) => {
  const { area } = props;

  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const endpoint =
    "https://api.coronavirus.data.gov.uk/v1/data?" +
    `filters=areaType=ltla;areaName=${area}&` +
    'structure={"date":"date","name":"areaName","code":"areaCode","cases":{"daily":"newCasesBySpecimenDate","cumulative":"cumCasesBySpecimenDateRate"},"deaths":{"daily":"newDeathsByDeathDate","cumulative":"cumDeathsByDeathDate"}}';

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loaded ? (
        <>
          <BarChart data={data} area={area} type="Cases" />
          <BarChart data={data} area={area} type="Deaths" />
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default Data;
