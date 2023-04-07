import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

const categories = [
  { id: 1, 
    name: "Food", 
    icon: <Ionicons name="fast-food-outline" size={30} color={"#0aada8"} />
  },
  { id: 2, 
    name: "Transportation", 
    icon:  <Ionicons name = "bus-outline" size={30} color = {"#0aada8" } />
  },
  { id: 3, 
    name: "Shopping", 
    icon:  <Ionicons name = "cart-outline" size={30} color = {"#0aada8"} />
  },
  {
    id: 4,
    name: "Entertainment",
    icon:  <Ionicons name = "game-controller-outline" size={30} color = {"#0aada8"} />
  },
  { id: 5, 
    name: "Housing", 
    icon:  <Ionicons name = "home-outline" size={30} color = {"#0aada8"} />
  },
  { id: 6, 
    name: "Utilities", 
    icon:  <Ionicons name = "flash-outline" size={30} color = {"#0aada8"} />
  },
  { id: 7, 
    name: "Other", 
    icon:  <Ionicons name = "file-tray" size={30} color = {"#0aada8" } />
  },
  {
    id: 8,
    name: "Salary",
    icon: (
      <FontAwesome5 name="hand-holding-usd" size={30} color={"#A04AAA"} />
    ),
  },
  {
    id: 9,
    name: "Interest",
    icon: (
      <MaterialCommunityIcons name="bank-outline" size={30} color={"#A04AAA"} />
    ),
  },
  {
    id: 10,
    name: "Investments",
    icon: (
      <MaterialIcons name="attach-money" size={30} color={"#A04AAA"} />
    ),
  },
  {
    id: 11,
    name: "Child benefit",
    icon: (
      <MaterialCommunityIcons name="baby-face-outline" size={30} color={"#A04AAA"} />
    ),
  },
  {
    id: 12,
    name: "Pension",
    icon: <Entypo name="shield" size={30} color="#A04AAA" />,
  },
  {
    id: 13,
    name: "Income",
    icon: (
      <FontAwesome5 name="money-bill-alt" size={24} color="#A04AAA" />
    ),
  },
  { id: 7, name: "Other", icon: "file-tray", color: "#A04AAA" },
];

const getCategoryIconByName = (name) => {
  const category = categories.find((c) => c.name === name);
  return category ? category.icon : <AntDesign name="shoppingcart" size={32} color="#888" />;
};

export default function ListItem({
    name,
    money,
    onPressCallback
}) {
  const categoryIcon = getCategoryIconByName(name);
  return (
    <View style={styles.container}>
      <View style={styles.item_container}>
        {categoryIcon}
        <View style={{marginLeft: 10}}>
          <Text style={styles.detail_text}>{name}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPressCallback}>
        <Text style={styles.money_text}>{money}$</Text>
      </TouchableOpacity>
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
