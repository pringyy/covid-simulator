import "./styles.css";

import Map from "./components/Map";
import ReactTooltip from "react-tooltip";
import { useState } from "react";

const App = () => {
  const [content, setContent] = useState("");
  return (
    // <div style={{ backgroundColor: "#27323a" }}>
    <div>
      <Map setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
};

export default App;
