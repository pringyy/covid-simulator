import React from "react";
import {VictoryBar} from "victory";

const BarChart = (props) => {
  const { data, area, type ,color, group, id, dates} = props;
console.log(data)

let dataProcessed= Object.entries(data).map(pair=>({x: new Date(pair[0].split('-')), y: pair[1]}))
console.log(dataProcessed)

return <VictoryBar  data={dataProcessed}/>
};

export default BarChart;

