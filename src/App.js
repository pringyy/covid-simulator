import "./styles.css";

import { AppBar, Box, Grid, Toolbar, Typography } from "@material-ui/core";
import React, { useState } from "react";

import CumulativeCases from "./components/CumulativeCasesAndDeaths";
import DailyCases from "./components/DailyCases";
import GenderCases from "./components/GenderCases";
import Map from "./components/Map";
import ReactTooltip from "react-tooltip";

const App = () => {
  const [areas, setAreas] = useState([]);
  const [content, setContent] = useState("");

  return (
    <>
      <AppBar elevation={0} style={{margin: 0, backgroundColor: "#311b92"}}>
        <Toolbar>
          <Typography variant="h6">
            <b>COVID-19 Visualiser</b>
          </Typography>
        </Toolbar>
      </AppBar>

      <Box mt={8}>
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
            <GenderCases />

            {areas.length === 3 ? (
              <>
                <CumulativeCases areas={areas} />
                <DailyCases areas={areas} />
              </>
            ) : (
              <p>Please select 3 areas to compare deaths and cases.</p>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default App;
