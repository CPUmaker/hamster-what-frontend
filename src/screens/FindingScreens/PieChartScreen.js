import React from "react";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import PieChartHelper from "../../components/PieChartHelper";

export default function PieChartScreen() {
  const pieData = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "orange",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "gold",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrow} onPress={() => {}}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <View style={{alignItems: "center"}}>
          <Text style={styles.header_text_up}>April 2023</Text>
          <Text style={styles.header_text_down}>2 TRANSACTIONS</Text>
        </View>
        <TouchableOpacity style={styles.arrow} onPress={() => {}}>
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <PieChartHelper data={pieData} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    borderRadius: 30,
    marginHorizontal: 25,
    marginVertical: 30,
    backgroundColor: "#002FA7",
  },
  header_text_up: {
    color: "powderblue",
    fontFamily: "Roboto-Medium",
    fontSize: 24,
  },
  header_text_down: {
    color: "powderblue",
    fontFamily: "Roboto-Regular",
    fontSize: 12,
  },
  arrow: {
    marginHorizontal: 10,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
  },
});
