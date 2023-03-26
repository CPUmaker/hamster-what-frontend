import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

import LineChartHelper from "../../components/LineChartHelper";

export default function LineChartScreen() {
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>Line Chart</Text>
        <LineChartHelper data={lineData} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
  },
});
