import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";
import { ThemeContext } from "../context/ThemeContext";

export default function CustomDrawer(props) {
  const { logout } = useContext(AuthContext);
  const { userProfile } = useContext(ProfileContext);
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
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={
            isDarkModeEnabled
              ? require("../../assets/profile_background_dark.jpg")
              : require("../../assets/profile_background.jpg")
          }
          style={{ padding: 20 }}
        >
          <Image
            source={photoAddr[userProfile.photo]}
            style={styles.profile_img}
          ></Image>
          <Text style={styles.name_text}>{userProfile.user.username}</Text>
          <Text style={styles.email_text}>{userProfile.user.email}</Text>
        </ImageBackground>
        <View
          style={
            isDarkModeEnabled
              ? styles.dark_drawer_container
              : styles.light_drawer_container
          }
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.extend_container}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("mailto://hamsterwhat@gmail.com");
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="share-social-outline"
              size={22}
              color={isDarkModeEnabled ? "#ccc" : "black"}
            />
            <Text
              style={
                isDarkModeEnabled
                  ? styles.dark_share_text
                  : styles.light_share_text
              }
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: 15 }}
          onPress={() => {
            logout();
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="log-out-outline"
              size={22}
              color={isDarkModeEnabled ? "#ccc" : "black"}
            />
            <Text
              style={
                isDarkModeEnabled
                  ? styles.dark_share_text
                  : styles.light_share_text
              }
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  light_drawer_container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  dark_drawer_container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 10,
  },
  profile_img: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name_text: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Roboto-Medium",
  },
  email_text: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
  },
  extend_container: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  light_share_text: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    color: "#000",
    marginLeft: 5,
  },
  dark_share_text: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    color: "#ccc",
    marginLeft: 5,
  },
});
