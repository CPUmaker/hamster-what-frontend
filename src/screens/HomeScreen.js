import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import PaymentSwitch from "../components/PaymentSwitch";
import ListItem from "../components/ListItem";
import { AuthContext } from "../context/AuthContext";

const dayBills = [
  {
    key: 1,
    name: "a1",
    date: "2022-01-01",
    money: "13,122",
  },
  {
    key: 2,
    name: "a2",
    date: "2022-01-02",
    money: "59",
  },
];
const monthBills = [
  {
    key: 3,
    name: "b1",
    date: "2023-01-01",
    money: "14,122",
  },
  {
    key: 4,
    name: "b2",
    date: "2023-01-02",
    money: "49",
  },
];

export default function HomeScreen({ navigation }) {
  const [switchTab, setSwitchTab] = useState(1);

  const {userInfo} = useContext(AuthContext);

  const onSelectSwitch = (value) => {
    setSwitchTab(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 20 }}>
        <View style={styles.profile_container}>
          <Text style={styles.profile_font}>Hello {userInfo.username}</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require("../../assets/profile.jpg")}
              style={styles.profile_img}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.search_container}>
          <EvilIcons
            name="search"
            size={32}
            color="#C6C6C6"
            style={{ marginRight: 5 }}
          />
          <TextInput placeholder="Search" />
        </View>

        <View style={styles.bank_container}>
          <Text style={styles.bank_title}>Bank Account</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: "#0aada8" }}>See all</Text>
          </TouchableOpacity>
        </View>

        <View>
          <PaymentSwitch
            selectionMode={1}
            option1="Today"
            option2="Monthly"
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        {switchTab == 1 &&
          dayBills.map((item) => (
            <ListItem
              key={item.key}
              name={item.name}
              date={item.date}
              money={item.money}
              onPressCallback={() =>
                navigation.navigate("BillDetails", {
                  title: item.name,
                  id: item.key,
                })
              }
            />
          ))}
        {switchTab == 2 &&
          monthBills.map((item) => (
            <ListItem
              key={item.key}
              name={item.name}
              date={item.date}
              money={item.money}
              onPressCallback={() =>
                navigation.navigate("BillDetails", {
                  title: item.name,
                  id: item.key,
                })
              }
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profile_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profile_img: {
    width: 35,
    height: 35,
  },
  profile_font: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
  },
  search_container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#C6C6C6",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  bank_container: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bank_title: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
  },
});