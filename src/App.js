import "./styles.css";

import React, { useState } from "react";

import CumulativeCases from "./components/CumulativeCasesAndDeaths";
import DailyCases from "./components/DailyCases";
import { Grid } from "@material-ui/core";
import Map from "./components/Map";
import ReactTooltip from "react-tooltip";

const App = () => {
  const [areas, setAreas] = useState([]);
  const [content, setContent] = useState("");

  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={12}
        md={5}
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

      <Grid item xs={12} md={7}>
        {areas.length === 3 ? (
          <>
            <CumulativeCases areas={areas} />
            <DailyCases areas={areas} />
          </>
        ) : (
          <p>Please select 3 areas</p>
        )}
        
      </Grid>
    </Grid>
  );
};

export default App;
