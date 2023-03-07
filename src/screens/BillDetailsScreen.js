import React from "react";
import { StyleSheet, View, ScrollView} from "react-native";

import CatagoryItem from "../components/CatagoryItem";
import { SafeAreaView } from "react-native-safe-area-context";

const groceriesBills = [
  {
    key: 1,
    name: "Costco",
    date:"2023-1-12",
    money: "120",
  },
  {
    key: 2,
    name: "Walmart",
    date: "2022-1-13",
    money: "59",
  },
];

export default function BillDetailsScreen() {

  const mapItems = groceriesBills.map((l) =>
    <CatagoryItem 
      key={l.key}
      name={l.name}
      money={l.money}
      date={l.date}
    >
    </CatagoryItem>       
  )
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 20 }}>
      <View>
        {mapItems}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#fff',
    alignItems: "center",
    margin: 4,
  },
  item_container: {
    flexDirection: "row",
    alignContent: "center",
    flex: 1,
  },
  detail_text: {
    color: "#333",
    fontFamily: "Roboto-Medium",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#0aada8",
    padding: 10,
    width: 100,
    borderRadius: 10,
  },
  money_text: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 14,
  },
});

