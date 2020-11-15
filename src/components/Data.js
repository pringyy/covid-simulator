import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./BarChart";

const Data = () => {
  const [data, setData] = useState({});
  const [area, setArea] = useState("S12000019");
  const [loaded, setLoaded] = useState(false);

  const endpoint =
    "https://api.coronavirus.data.gov.uk/v1/data?" +
    `filters=areaType=utla;areaCode=${area}&` +
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
    <Fragment>
      {loaded ? (
        <Fragment>
          <BarChart data={data} />

          {data.map((d) => (
            <p>
              {d.name} - <b>{d.date}</b> - {d.cases.daily}
            </p>
          ))}
        </Fragment>
      ) : (
        <p>loading...</p>
      )}
    </Fragment>
  );
};

export default Data;
