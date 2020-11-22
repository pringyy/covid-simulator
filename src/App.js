import "./styles.css";

import React, { useState } from "react";

import Data from "./components/Data";
import { Grid } from "@material-ui/core";
import Map from "./components/map";
import ReactTooltip from "react-tooltip";

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
        {areas.map((area) => (
          <Data area={area} />
        ))}
      </Grid>
    </Grid>
  );
};

export default App;
