import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

import BarChartHelper from "../../components/BarChartHelper";

export default function BarChartScreen() {
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>Bar Chart</Text>
        <BarChartHelper data={barData} />
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
