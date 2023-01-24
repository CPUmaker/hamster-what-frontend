import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

export default function CustomDrawer(props) {
  const {logout} = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#fff" }}
      >
        <ImageBackground
          source={require("../../assets/profile_background.jpg")}
          style={{ padding: 20 }}
        >
          <Image
            source={require("../../assets/profile.jpg")}
            style={styles.profile_img}
          ></Image>
          <Text style={styles.name_text}>Chris Li</Text>
          <Text style={styles.email_text}>xjhmlcy@gmail.com</Text>
        </ImageBackground>
        <View style={styles.drawer_container}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.extend_container}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} color="black" />
            <Text style={styles.share_text}>Tell a Friend</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 15 }} onPress={() => {logout()}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="log-out-outline" size={22} color="black" />
            <Text style={styles.share_text}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer_container: {
    flex: 1,
    backgroundColor: "#fff",
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
  share_text: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    marginLeft: 5,
  },
});