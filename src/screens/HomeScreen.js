import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";

import PaymentSwitch from "../components/PaymentSwitch";
import ListItem from "../components/ListItem";
import { ProfileContext } from "../context/ProfileContext";
import { ThemeContext } from "../context/ThemeContext";
import { endpoints } from "../config";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HomeScreen({ navigation, route }) {
  const [switchTab, setSwitchTab] = useState("Today");
  const [ifReadProfile, setReadProfile] = useState(true);
  const { readProfile, userProfile } = useContext(ProfileContext);
  const { isDarkModeEnabled } = useContext(ThemeContext);
  const photoAddr = [
    require(`../../assets/profile.jpg`),
    require("../../assets/profile01.png"),
    require("../../assets/profile02.png"),
    require("../../assets/profile03.png"),
    require("../../assets/profile04.png"),
    require("../../assets/profile05.png"),
    require("../../assets/profile06.png"),
  ];
  const [dayBills, setDayBills] = useState(null);
  const [monthBills, setMonthBills] = useState(null);
  //readProfile();
  useEffect(() => {
    if (ifReadProfile) {
      readProfile();
      setReadProfile(false);
    }
  });
  const onSelectSwitch = (value) => {
    setSwitchTab(value);
  };

  function todaySum() {
    axios
      .get(`${endpoints.pricesum}`, { params: { item: "today" } })
      .then((response) => {
        data = Object.entries(response.data).map(([key, value]) => ({
          key,
          value,
        }));
        data = data
          .filter((item) => item.value !== null)
          .sort((a, b) => b.value - a.value);
        setDayBills(data);
        //console.log(dayBills)
      })
      .catch((error) => {
        console.log(`Get sum: ${error}`);
      });
  }

  function monthSum() {
    axios
      .get(`${endpoints.pricesum}`, { params: { item: "month" } })
      .then((response) => {
        data = Object.entries(response.data).map(([key, value]) => ({
          key,
          value,
        }));
        data = data
          .filter((item) => item.value !== null)
          .sort((a, b) => b.value - a.value);
        setMonthBills(data);
        //console.log(dayBills);
      })
      .catch((error) => {
        console.log(`Get sum: ${error}`);
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      todaySum();
      monthSum();
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <ListItem
        key={item.key}
        name={item.key}
        money={item.value}
        onPressCallback={() =>
          navigation.navigate("BillDetails", {
            title: item.name,
            id: item.key,
          })
        }
      />
    );
  };
  return (
    <SafeAreaView
      style={isDarkModeEnabled ? styles.dark_container : styles.light_container}
    >
      <View style={{ padding: 20 }}>
        <View style={styles.profile_container}>
          <Text
            style={
              isDarkModeEnabled
                ? styles.dark_profile_font
                : styles.dark_profile_font
            }
          >
            Hello {userProfile.user?.username}
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={photoAddr[userProfile.photo]}
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
          <Text
            style={
              isDarkModeEnabled
                ? styles.dark_bank_title
                : styles.light_bank_title
            }
          >
            Bank Account
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SeeAll")}>
            <Text style={{ color: "#0aada8" }}>See all</Text>
          </TouchableOpacity>
        </View>

        <View>
          <PaymentSwitch
            selectionMode={"Today"}
            option1="Today"
            option2="Monthly"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        {switchTab == "Today" && (
          <FlatList
            data={dayBills}
            renderItem={renderItem}
            keyExtractor={(item) => item.key.toString()}
            extraData={dayBills}
            scrollEnabled={true}
          />
        )}
        {switchTab == "Monthly" && (
          <FlatList
            data={monthBills}
            renderItem={renderItem}
            keyExtractor={(item) => item.key.toString()}
            extraData={monthBills}
            scrollEnabled={true}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddNew")}
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          bottom: 1,
          left: SCREEN_WIDTH * 0.5 - 25,
        }}
      >
        <Ionicons name="add-circle" size={50} color="#283044" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  light_container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dark_container: {
    flex: 1,
    backgroundColor: "#242c40",
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
  light_profile_font: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: "#000",
  },
  dark_profile_font: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: "#fff",
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
  light_bank_title: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: "#000",
  },
  dark_bank_title: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: "#fff",
  },
});
