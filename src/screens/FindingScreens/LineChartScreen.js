import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import LineChartHelper from "../../components/LineChartHelper";
import { AnimatedText } from "../../components/AnimatedText";

export default function LineChartScreen() {
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(date.getFullYear());
  const [numBills, setNumBills] = useState(3);

  useEffect(() => {
    setYear(date.getFullYear());
    setNumBills(Math.floor(Math.random() * 20));
  }, [date]);

  const lineData = [
    { x: "Jan", y: Math.random() * 200 },
    { x: "Feb", y: Math.random() * 200 },
    { x: "Mar", y: Math.random() * 200 },
    { x: "Apr", y: Math.random() * 200 },
    { x: "May", y: Math.random() * 200 },
    { x: "Jun", y: Math.random() * 200 },
    { x: "Jul", y: Math.random() * 200 },
    { x: "Aug", y: Math.random() * 200 },
    { x: "Sep", y: Math.random() * 200 },
    { x: "Oct", y: Math.random() * 200 },
    { x: "Nov", y: Math.random() * 200 },
    { x: "Dec", y: Math.random() * 200 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            setDate(new Date(date.setFullYear(date.getFullYear() - 1)));
          }}
        >
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <AnimatedText style={styles.header_text_up} text={`${year}`} />
          <AnimatedText style={styles.header_text_down} text={`${numBills} TRANSACTIONS`}/>
        </View>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            setDate(new Date(date.setFullYear(date.getFullYear() + 1)));
          }}
        >
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
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
