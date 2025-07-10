import React from "react";
import { Line } from "react-chartjs-2";
function AreaChart({ height, width, options, dataPoints, plugins }) {
  return (
    <Line
      data={dataPoints}
      width={width}
      height={height}
      options={options}
      plugins={plugins}
    />
  );
}

export default AreaChart;
