import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const LineChartHelper = ({ data }) => {
  return (
    <LineChart
      data={data}
      width={Dimensions.get("window").width - 16} // from react-native
      height={220}
      yAxisLabel={"$"}
      chartConfig={{
        backgroundColor: "#1cc910",
        backgroundGradientFrom: "#eff3ff",
        backgroundGradientTo: "#efefef",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default LineChartHelper;
