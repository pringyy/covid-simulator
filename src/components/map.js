import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import React, { memo, useEffect, useState } from "react";

import axios from "axios";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/gb/topo_lad.json";

let colorScale = () => {};

const Map = (props) => {
  const { setTooltipContent, areas, setAreas } = props;

  const [data, setData] = useState();

  let today = new Date();
  let todayString = `${today.getFullYear()}-${today.getMonth()}-${
    today.getDate() - 5
  }`;

  const endpoint = `https://api.coronavirus.data.gov.uk/v1/data?page=1-100&filters=areaType=ltla;date=${todayString}&structure=%7B%22area%22:%22areaName%22,%22cumCasesBySpecimenDateRate%22:%22cumCasesBySpecimenDateRate%22%7D`;

  useEffect(() => {
    axios.get(endpoint).then((res) => {
      setData(res.data.data);
      const maxVal = Math.max.apply(
        Math,
        res.data.data.map((x) => {
          return x.cumCasesBySpecimenDateRate;
        })
      );
      colorScale = scaleLinear()
        .domain([0, maxVal])
        .range(["#ffedea", "#ff5233"]);
    });
  }, []);

  return (
    <>
      <ComposableMap
        data-tip="Select County"
        style={{ height: "100%", width: "100%" }}
      >
        <ZoomableGroup zoom={30} minZoom={30} maxZoom={100} center={[-2, 55]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.area === geo.properties.LAD13NM);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      try {
                        setTooltipContent(
                          <>
                            <p>{geo.properties.LAD13NM}</p>
                            <p>
                              {d.cumCasesBySpecimenDateRate} Cases Per 100K{" "}
                            </p>
                          </>
                        );
                      } catch (error) {
                        setTooltipContent(
                          <>
                            <p>{geo.properties.LAD13NM}</p>
                            <p>Data Unavailable</p>
                          </>
                        );
                      }
                    }}
                    fill={
                      d
                        ? colorScale(d["cumCasesBySpecimenDateRate"])
                        : "#F5F4F6"
                    }
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => {
                      if (!areas.includes(geo.properties.LAD13NM)) {
                        if (areas.length === 3) {
                          // max of 3 areas selected at 1 time
                          let areasCopy = [...areas];
                          areasCopy.pop();
                          setAreas([geo.properties.LAD13NM, ...areasCopy]);
                        } else {
                          setAreas([geo.properties.LAD13NM, ...areas]);
                        }
                      }
                    }}
                    style={{
                      default: {
                        outline: "none",
                        strokeWidth: 0.01,
                        stroke: "#27323a",
                      },
                      hover: {
                        outline: "none",
                      },
                      pressed: {
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(Map);
