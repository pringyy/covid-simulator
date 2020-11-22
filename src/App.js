import "./styles.css";

import React, { useState } from "react";

import CumulativeCases from "./components/CumulativeCases";
import { Grid } from "@material-ui/core";
import Map from "./components/Map";
import ReactTooltip from "react-tooltip";
import Visual from "./components/Visual";

const App = () => {
  const [areas, setAreas] = useState([]);
  const [content, setContent] = useState("");

  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        style={{
          height: "100vh",
        }}
      >
        <Map
          setTooltipContent={setContent}
          setAreas={(area) => setAreas(area)}
          areas={areas}
        />
        <ReactTooltip>{content}</ReactTooltip>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        {/* {areas.map((area) => (
          <Visual area={area} />
        ))} */}

        {areas.length === 3 ? (
          <CumulativeCases areas={areas} />
        ) : (
          <p>Please select 3 areas</p>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
