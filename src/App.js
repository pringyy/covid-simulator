import './styles.css'

import Map from './components/map'
import ReactTooltip from 'react-tooltip'
import {useState} from 'react'

function App() {
  const [content, setContent] = useState("");
  return (
    <div style={{backgroundColor:"#27323a"}}>
    <Map setTooltipContent={setContent}
/>
  <ReactTooltip>{content}</ReactTooltip>
  </div>
  );
}

export default App;
