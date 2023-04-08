import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";

import Fund from "../../assets/fund-collection.svg";
import Billing from "../../assets/billing.svg";
import Account from "../../assets/account.svg";
import { ThemeContext } from "../context/ThemeContext";

export default function OnBoardingScreen({ navigation }) {
  const { isDarkModeEnabled } = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkModeEnabled ? "#242c40" : "#fff" },
      ]}
    >
      <View style={{ marginTop: 20 }}>
        <Text
          style={
            isDarkModeEnabled ? styles.dark_title_font : styles.light_title_font
          }
        >
          RECORD YOUR BILLS
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Fund width={"25%"} height={"100%"} />
        <Billing width={"25%"} height={"100%"} />
        <Account width={"25%"} height={"100%"} />
      </View>
      <TouchableOpacity
        style={styles.begin_button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.button_font}>Let's Begin</Text>
        <AntDesign name="right" size={22} color="#fff" />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  light_title_font: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
    color: "#20315f",
  },
  dark_title_font: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
    color: "#2091ff",
  },
  button_font: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto-MediumItalic",
    color: "#fff",
  },
  begin_button: {
    backgroundColor: "#AD40AF",
    marginBottom: 50,
    padding: 20,
    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
