import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  VictoryArea,
  VictoryChart,
  VictoryTheme,
  VictoryCursorContainer,
} from "victory-native";

const defaultGraphicData = [
  { x: "Jan", y: 2 },
  { x: "Feb", y: 3 },
  { x: "Mar", y: 5 },
  { x: "Apr", y: 4 },
  { x: "May", y: 7 },
  { x: "Jun", y: 2 },
  { x: "Jul", y: 3 },
  { x: "Aug", y: 5 },
  { x: "Sep", y: 4 },
  { x: "Oct", y: 7 },
  { x: "Nov", y: 4 },
  { x: "Dec", y: 7 },
];

const LineChartHelper = ({ data }) => {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(data);
  }, [data]);

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryCursorContainer
          labels={({ datum }) => `${datum.x}, ${round(datum.y, 2)}`}
        />
      }
    >
      <VictoryArea
        interpolation="natural"
        data={graphicData}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        style={{
          data: {
            fill: "lightblue", fillOpacity: 0.7, stroke: "#0040AF", strokeWidth: 3
          }
        }}
      />
    </VictoryChart>
  );
};

export default LineChartHelper;
