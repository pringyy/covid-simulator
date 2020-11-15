import React, { memo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import Data from "./Data";

const geoUrl =
  "https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/gb/topo_lad.json";

const Map = ({ setTooltipContent }) => {
  const [showMap, setShowMap] = useState(true);
  const [area, setArea] = useState("");

  return (
    <>
      {showMap ? (
        <ComposableMap data-tip="Select County">
          <ZoomableGroup zoom={8} maxZoom={100} center={[-2, 50]}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(geo.properties.LAD13NM);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => {
                      setShowMap(false);
                      setArea(geo.properties.LAD13NM);
                    }}
                    style={{
                      default: {
                        fill: "29a19c",
                        outline: "none",
                        strokeWidth: 0.01,
                        stroke: "#27323a",
                      },
                      hover: {
                        fill: "a3f7bf",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#FFF",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      ) : (
        <Data area={area} />
      )}
    </>
  );
};

export default memo(Map);
