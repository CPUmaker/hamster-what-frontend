import { React, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
  Modal,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { ListItem, Avatar } from "@rneui/themed";
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import CountryStateList from "../../assets/country-state-list.json";

import { endpoints } from "../config";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileScreen({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const { readProfile, userProfile } = useContext(ProfileContext);
  const { isDarkModeEnabled } = useContext(ThemeContext);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [ifReadProfile, setReadProfile] = useState(true);
  const [ifListen, setListen] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [CountryRegion, setCountryRegion] = useState("");
  const [StateRegion, setStateRegion] = useState("");

  const countryList = [];

  useEffect(() => {
    if (ifListen) {
      DeviceEventEmitter.addListener("bio_receive", () => {
        setReadProfile(true);
      });
      setListen(false);
    }
  });

  useEffect(() => {
    if (ifReadProfile) {
      readProfile();
      setReadProfile(false);
    }
  });

  useEffect(() => {
    //console.log(CountryStateList.countries);
    for (var id in CountryStateList.countries) {
      countryList.push({
        key: id.toString(),
        value: CountryStateList.countries[id].country,
      });
    }
  });
  /* Profile data*/
  const list = [
    {
      Title: "User Name",
      Subtitle: userProfile.user.username,
      Nav: "User Name",
    },
    /* TODO */
    {
      Title: "Email",
      Subtitle: userProfile.user.email,
      Nav: "Email",
    },
    {
      Title: "Birthday",
      Subtitle: userProfile.birthday,
      Nav: "Set",
    },
    {
      Title: "Location",
      Subtitle: userProfile.city + " " + userProfile.country,
      Nav: "Set",
    },
    {
      Title: "Affiliation",
      Subtitle: userProfile.affiliation,
      Nav: "Affiliation",
    },
    {
      Title: "Bio",
      Subtitle: userProfile.bio,
      Nav: "Bio",
    },
    {
      Title: "My Account Books",
      Subtitle: " ",
      Nav: "Set",
    },
  ];

  const photoAddr = [
    require(`../../assets/profile.jpg`),
    require("../../assets/profile01.png"),
    require("../../assets/profile02.png"),
    require("../../assets/profile03.png"),
    require("../../assets/profile04.png"),
    require("../../assets/profile05.png"),
    require("../../assets/profile06.png"),
  ];

  /* date */
  const handleDateConfirm = (date) => {
    //console.log(date);
    axios
      .patch(endpoints.profile, { birthday: date.toLocaleDateString("en-CA") })
      .catch((error) => {
        console.log(`Set birthday error: ${error}`);
      });
    hideDatePicker();
    setReadProfile(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  /* country-state */
  const getStatelist = (CountryName) => {
    let stateL = [];
    if (CountryName != "")
      stateL = CountryStateList.countries.find((e) => e.country == CountryName);
    else stateL = [];
    let stateList = [];
    for (var id in stateL.states) {
      stateList.push({ key: id.toString(), value: stateL.states[id] });
    }
    //console.log(stateList)
    return stateList;
  };

  const handleCountryStateConfirm = (country, state) => {
    axios
      .patch(endpoints.profile, { country: country, city: state })
      .catch((error) => {
        console.log(`Set Country City error: ${error}`);
      });
    setModalVisible(!modalVisible);
    setCountryRegion("");
    setReadProfile(true);
  };

  const mapItems = list.map((l, i) => (
    <TouchableOpacity
      key={i}
      onPress={() => {
        if (i == 2) {
          setDatePickerVisibility(true);
        } else if (i == 3) {
          setModalVisible(true);
        } else {
          navigation.navigate(l.Nav);
          console.log(photoAddr[userProfile.photo]);
        }
      }}
    >
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: isDarkModeEnabled ? "#242c40" : "#fff",
        }}
      >
        <ListItem.Content
          style={{ color: isDarkModeEnabled ? "#fff" : "#000" }}
        >
          <ListItem.Title
            style={{ color: isDarkModeEnabled ? "#fff" : "#000" }}
          >
            {l.Title}
          </ListItem.Title>
        </ListItem.Content>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View
              style={
                isDarkModeEnabled ? styles.darkModalView : styles.lightModalView
              }
            >
              <View style={styles.selectBoxStyle}>
                <SelectList
                  setSelected={(val) => setCountryRegion(val)}
                  data={countryList}
                  save="value"
                />
              </View>
              <View style={styles.selectBoxStyle}>
                <SelectList
                  setSelected={(val) => setStateRegion(val)}
                  data={getStatelist(CountryRegion)}
                  save="value"
                />
              </View>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() =>
                  handleCountryStateConfirm(CountryRegion, StateRegion)
                }
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setCountryRegion("");
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <ListItem.Subtitle
          style={{ color: isDarkModeEnabled ? "#fff" : "#000" }}
        >
          {l.Subtitle}
        </ListItem.Subtitle>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  ));

  return (
    <View
      style={isDarkModeEnabled ? styles.dark_container : styles.light_container}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <ListItem
          bottomDivider
          containerStyle={{
            backgroundColor: isDarkModeEnabled ? "#242c40" : "#fff",
          }}
        >
          <ListItem.Content
            style={{ color: isDarkModeEnabled ? "#fff" : "#000" }}
          >
            <ListItem.Title
              style={{ color: isDarkModeEnabled ? "#fff" : "#000" }}
            >
              Profile Photo
            </ListItem.Title>
          </ListItem.Content>
          <Avatar rounded source={photoAddr[userProfile.photo]} />
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
      {mapItems}
    </View>
  );
}

const styles = StyleSheet.create({
  light_container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  dark_container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#242c40",
  },
  content: {
    margin: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  lightModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 70,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  darkModalView: {
    margin: 20,
    backgroundColor: "#242c40",
    borderRadius: 20,
    padding: 70,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    margin: 20,
    width: 150,
  },
  buttonOpen: {
    backgroundColor: "#AD40AF",
  },
  buttonClose: {
    backgroundColor: "#A5C9CA",
  },
  textStyle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 14,
    color: "#fff",
  },
  selectBoxStyle: {
    width: 200,
    margin: 10,
  },
});
