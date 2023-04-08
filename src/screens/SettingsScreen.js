import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
  Switch,
  Appearance,
  useColorScheme,
  Button,
} from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import { Card, Icon, ListItem } from "@rneui/themed";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";

import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function SettingsScreen({ navigation }) {
  const { accountDelete, turnOnBioAuth, turnOffBioAuth, isUsingBioAuth } =
    useContext(AuthContext);
  const { isDarkModeEnabled, setDarkMode } = useContext(ThemeContext);

  const deleteCheck = () => {
    Alert.alert(
      "Deleting profile",
      "This action will permanently delete your profile and can not be undo, are you sure?",
      [
        {
          text: "Confirm",
          onPress: () => {
            accountDelete();
            console.log("Confirm Pressed");
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
      ]
    );
  };

  const [isFaceIDEnabled, setFaceID] = useState(false);
  const faceIDHandler = async () => {
    //setFaceID(!isFaceIDEnabled);
    console.log("faceIDHandler", isUsingBioAuth);
    if (!isUsingBioAuth) {
      const result = await turnOnBioAuth();
      setFaceID(result);
    } else {
      turnOffBioAuth();
      setFaceID(false);
    }
  };

  // for switching light/dark mode

  const colorScheme = "light";

  //////////
  const themeTextStyle =
    isDarkModeEnabled === false ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    isDarkModeEnabled === false ? styles.lightContainer : styles.darkContainer;

  const handlethemeSwitch = async () => {
    setDarkMode(!isDarkModeEnabled);
  };
  console.log("darkModeHandler2", isDarkModeEnabled);

  return (
    <ScrollView
      style={[{ paddingHorizontal: 20 }, styles.container, themeContainerStyle]}
    >
      {/* <View style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.text, themeTextStyle]}>
              Color scheme: {colorScheme}
            </Text>
            <StatusBar />
          </View> */}

      <Text style={[styles.settings_title, themeTextStyle]}>
        Account Settings
      </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <ListItem containerStyle={[styles.container_item, themeContainerStyle]}>
          <MaterialCommunityIcons name="account" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title style={themeTextStyle}>Profile</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      <ListItem containerStyle={[styles.container_item, themeContainerStyle]}>
        <Octicons name="checklist" size={24} color="black" />
        <ListItem.Content>
          <ListItem.Title style={themeTextStyle}>
            Account Information
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      {/* <ListItem containerStyle={styles.container_item}>
            <Entypo name="bell" size={24} color="black" />
            <ListItem.Content>
              <ListItem.Title>Subscription</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem> */}

      <Text style={[styles.settings_title, themeTextStyle]}>App Settings</Text>
      <ListItem containerStyle={[styles.container_item, themeContainerStyle]}>
        <MaterialIcons name="attach-money" size={24} color="black" />
        <ListItem.Content>
          <ListItem.Title style={themeTextStyle}>Unit Settings</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem containerStyle={[styles.container_item, themeContainerStyle]}>
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={24}
          color="black"
        />
        <ListItem.Content>
          <ListItem.Title style={themeTextStyle}>Dark Mode</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={isDarkModeEnabled}
          onValueChange={handlethemeSwitch}
          thumbColor="#fff"
          //   trackColor={{ true: '#0066CC' }}
        />
      </ListItem>

      {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <ListItem containerStyle={styles.container_item}>
              <Entypo name="notification" size={24} color="black" />
              <ListItem.Content>
                <ListItem.Title>Notification</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity> */}

      <Text style={[styles.settings_title, themeTextStyle]}>Security</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Password");
        }}
      >
        <ListItem containerStyle={[styles.container_item, themeContainerStyle]}>
          <MaterialCommunityIcons
            name="form-textbox-password"
            size={24}
            color="black"
          />
          <ListItem.Content>
            <ListItem.Title style={themeTextStyle}>Password</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      <ListItem containerStyle={[styles.container_item, themeContainerStyle]}>
        <MaterialCommunityIcons
          name="face-recognition"
          size={24}
          color="black"
        />
        <ListItem.Content>
          <ListItem.Title style={themeTextStyle}>
            FaceID / TouchID
          </ListItem.Title>
        </ListItem.Content>
        <Switch
          value={isUsingBioAuth}
          onValueChange={faceIDHandler}
          thumbColor="#fff"
          //   trackColor={{ true: '#0066CC' }}
        />
      </ListItem>

      <Text style={[styles.settings_title, themeTextStyle]}>Support</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Contact Us");
        }}
      >
        <ListItem containerStyle={[styles.container_item, themeContainerStyle]}>
          <AntDesign name="phone" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title style={themeTextStyle}>Contact us</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      <TouchableOpacity onPress={deleteCheck}>
        <ListItem containerStyle={[styles.container_item, themeContainerStyle]}>
          <MaterialIcons name="delete-outline" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title style={{ color: "red", fontWeight: "bold" }}>
              Delete profile
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      <View style={{ marginBottom: 5 }}></View>
      <View></View>

      <Text style={[styles.settings_title, themeTextStyle]}>Miscellaneous</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Terms & Conditions");
        }}
      >
        <ListItem containerStyle={[styles.container_item, themeContainerStyle]}>
          <ListItem.Content>
            <ListItem.Title style={themeTextStyle}>
              Terms & Conditions
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Privacy Policy");
        }}
      >
        <ListItem containerStyle={[styles.container_item, themeContainerStyle]}>
          <ListItem.Content>
            <ListItem.Title style={themeTextStyle}>
              Privacy Policy
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lightContainer: {
    backgroundColor: "white",
  },
  darkContainer: {
    backgroundColor: "#242c40",
  },
  lightThemeText: {
    color: "#242c40",
  },
  darkThemeText: {
    color: "#d0d0c0",
  },
  settings_title: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    paddingTop: 10,
    fontWeight: "bold",
  },
  container_item: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
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
  dark_theme: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
