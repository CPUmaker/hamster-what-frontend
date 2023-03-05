import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CatagoryItem({
    name,
    money,
    date,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.item_container}>
        <AntDesign name="shoppingcart" size={32} color="black" />
        <View style={{marginLeft: 10}}>
          <Text style={styles.detail_text}>{name}</Text>
          <Text style={styles.detail_text}>date: {date}</Text>
        </View>
      </View>
      <View style={{marginRight: 10}}>
          <Text style={styles.detail_text}>{money}$</Text>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
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
