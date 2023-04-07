import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { VictoryPie, VictoryTheme } from "victory-native";
import { ThemeContext } from "../context/ThemeContext";

const defaultGraphicData = [
  { x: "Liquid", y: 0 },
  { x: "Iced", y: 0 },
  { x: "Total", y: 100 },
];

const PieChartHelper = ({ data }) => {
  const { isDarkModeEnabled } = useContext(ThemeContext);
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(data);
  }, [data]);

  return (
    <View style={{ justifyContent: "center" }}>
      <VictoryPie
        animate={{ easing: "exp", duration: 2000 }}
        data={graphicData}
        theme={VictoryTheme.material}
        colorScale="qualitative"
        innerRadius={60}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
            fillOpacity: 0.9,
            stroke: "#fff",
            strokeWidth: 2,
          },
          labels: {
            fill: isDarkModeEnabled ? "#ccc" : "#333",
          },
        }}
      />
    </View>
  );
};

export default PieChartHelper;
