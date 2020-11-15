import { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Data = () => {
  const [data, setData] = useState({});
  const [area, setArea] = useState("S12000033");
  const [loaded, setLoaded] = useState(false);

  const endpoint =
    "https://api.coronavirus.data.gov.uk/v1/data?" +
    `filters=areaCode=${area}&` +
    'structure={"date":"date","name":"areaName","code":"areaCode","cases":{"daily":"newCasesByPublishDate","cumulative":"cumCasesByPublishDate"},"deaths":{"daily":"newDeathsByDeathDate","cumulative":"cumDeathsByDeathDate"}}';

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
