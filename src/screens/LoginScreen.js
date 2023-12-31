import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";

import LoginSVG from "../../assets/misc/login.svg";
import GoogleSVG from "../../assets/misc/google.svg";
import AppleSVG from "../../assets/misc/apple.svg";
import MetaSVG from "../../assets/misc/meta.svg";
import Exclamation from "../../assets/misc/exclamation-circle.svg";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  const { login, googleAuth, facebookAuth, appleAuth } =
    useContext(AuthContext);
  const { isDarkModeEnabled } = useContext(ThemeContext);

  const loginErrorHandle = (errorMessage) => {
    setModalMessage(errorMessage);
    setModalVisible(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setModalVisible(false);
    }, 5000);
  }, [isModalVisible]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkModeEnabled ? "#242c40" : "#fff" },
      ]}
    >
      <Modal
        isVisible={isModalVisible}
        hasBackdrop={false}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={["up"]}
        animationOut={"slideOutUp"}
        style={styles.modal_style}
      >
        <View style={styles.modal_container}>
          <Exclamation height={20} width={20} style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16 }}>{modalMessage}</Text>
        </View>
      </Modal>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={styles.svg_container}>
          <LoginSVG height={300} width={300} />
        </View>

        <Text style={isDarkModeEnabled ? styles.dark_font : styles.light_font}>
          Login
        </Text>

        <View style={styles.text_input_container}>
          <AntDesign
            name="user"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Username/Email"
            autoCapitalize="none"
            style={[
              styles.text_input,
              { color: isDarkModeEnabled ? "white" : "black" },
            ]}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <View style={styles.text_input_container}>
          <AntDesign
            name="lock"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Password"
            style={[
              styles.text_input,
              { color: isDarkModeEnabled ? "white" : "black" },
            ]}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgot_text}>Forgot?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.login_button}
          onPress={() => {
            login(username, password, loginErrorHandle);
          }}
        >
          <Text style={styles.login_text}>Login</Text>
        </TouchableOpacity>

        <Text
          style={
            isDarkModeEnabled
              ? styles.dark_alter_login_text
              : styles.light_alter_login_text
          }
        >
          Or, login with ...
        </Text>

        <View style={styles.alter_login_container}>
          <TouchableOpacity
            style={styles.alter_login_icon}
            onPress={() => {
              googleAuth();
            }}
          >
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.alter_login_icon}
            onPress={() => {
              appleAuth();
            }}
          >
            <AppleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.alter_login_icon}
            onPress={() => {
              facebookAuth();
            }}
          >
            <MetaSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.register_container}>
          <Text style={{ color: isDarkModeEnabled ? "white" : "black" }}>
            New to the app?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.register_text}> Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  svg_container: {
    alignItems: "center",
  },
  light_font: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  dark_font: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: "#ccc",
    marginBottom: 30,
  },
  text_input_container: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  text_input: {
    flex: 1,
    paddingVertical: 0,
  },
  forgot_text: {
    color: "#AD40AF",
    fontWeight: "700",
  },
  login_button: {
    backgroundColor: "#AD40AF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  login_text: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
  alter_login_container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
  light_alter_login_text: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  dark_alter_login_text: {
    textAlign: "center",
    color: "#aaa",
    marginBottom: 30,
  },
  alter_login_icon: {
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  register_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  register_text: {
    color: "#AD40AF",
    fontWeight: "700",
  },
  modal_style: {
    justifyContent: "flex-start",
    marginTop: 60,
  },
  modal_container: {
    backgroundColor: "#ddd",
    padding: 16,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
