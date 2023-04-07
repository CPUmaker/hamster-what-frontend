import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  AntDesign,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

import { ThemeContext } from "../context/ThemeContext";
import categoryIcons from "./CategoryIcons";

const getCategoryIconByName = (name) => {
  const category = categoryIcons.find((c) => c.name === name);
  return category ? (
    category.icon
  ) : (
    <AntDesign name="shoppingcart" size={30} color="#888" />
  );
};

export default function CatagoryItem({ name, money, date }) {
  const { isDarkModeEnabled } = useContext(ThemeContext);
  const categoryIcon = getCategoryIconByName(name);
  return (
    <View
      style={isDarkModeEnabled ? styles.dark_container : styles.light_container}
    >
      <View style={styles.item_container}>
        {categoryIcon}
        <View style={{ marginLeft: 10 }}>
          <Text
            style={
              isDarkModeEnabled
                ? styles.dark_detail_text
                : styles.light_detail_text
            }
          >
            {name}
          </Text>
          <Text
            style={
              isDarkModeEnabled
                ? styles.dark_detail_text
                : styles.light_detail_text
            }
          >
            date: {date}
          </Text>
        </View>
      </View>
      <View style={{ marginRight: 10 }}>
        <Text
          style={
            isDarkModeEnabled
              ? styles.dark_detail_text
              : styles.light_detail_text
          }
        >
          {money}$
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  light_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  dark_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#242c40",
  },
  item_container: {
    flexDirection: "row",
    alignContent: "center",
    flex: 1,
  },
  light_detail_text: {
    color: "#333",
    fontFamily: "Roboto-Medium",
    fontSize: 14,
  },
  dark_detail_text: {
    color: "#ddd",
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
