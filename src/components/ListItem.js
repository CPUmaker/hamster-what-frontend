import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
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
    <AntDesign name="shoppingcart" size={32} color="#888" />
  );
};

export default function ListItem({ name, money, onPressCallback }) {
  const { isDarkModeEnabled } = useContext(ThemeContext);

  const categoryIcon = getCategoryIconByName(name);
  return (
    <View style={styles.container}>
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
