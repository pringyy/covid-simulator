import { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Data = () => {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const endpoint =
    "https://api.coronavirus.data.gov.uk/v1/data?" +
    "filters=areaType=nation;areaName=scotland&" +
    'structure={"date":"date","newCases":"newCasesByPublishDate"}';

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
            <Fragment>
              <p>
                <b>{d["date"]}</b> - {d["newCases"]}
              </p>
            </Fragment>
          ))}
        </Fragment>
      ) : (
        <p>loading...</p>
      )}
    </Fragment>
  );
};

export default Data;
