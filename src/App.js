import "./styles.css";

import Data from "./components/Data";
import Map from "./components/Map";
import ReactTooltip from "react-tooltip";
import { useState } from "react";

const App = () => {
  const [areas, setAreas] = useState([])
  const [content, setContent] = useState("");
  return (
    <div>
      <div style={{height:'50vh'}}>
      <Map setTooltipContent={setContent} setAreas={(area) => setAreas(area)} areas={areas} />
      <ReactTooltip>{content}</ReactTooltip>
      </div>
      <div>
      {areas.map((area)=><Data area = {area}/>)}
      
      </div>
    </div>
  );
};

export default App;
