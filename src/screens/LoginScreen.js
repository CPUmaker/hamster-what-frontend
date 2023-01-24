import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import LoginSVG from "../../assets/misc/login.svg";
import GoogleSVG from "../../assets/misc/google.svg";
import AppleSVG from "../../assets/misc/apple.svg";
import TwitterSVG from "../../assets/misc/twitter.svg";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={styles.svg_container}>
          <LoginSVG height={300} width={300} />
        </View>

        <Text style={styles.font}>Login</Text>

        <View style={styles.text_input_container}>
          <AntDesign
            name="user"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Username"
            autoCapitalize="none"
            style={styles.text_input}
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
            style={styles.text_input}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.forgot_text}>Forgot?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.login_button}
          onPress={() => {
            login(username, password);
          }}
        >
          <Text style={styles.login_text}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.alter_login_text}>Or, login with ...</Text>

        <View style={styles.alter_login_container}>
          <TouchableOpacity style={styles.alter_login_icon} onPress={() => { }}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.alter_login_icon} onPress={() => { }}>
            <AppleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.alter_login_icon} onPress={() => { }}>
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.register_container}>
          <Text>New to the app?</Text>
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
    backgroundColor: "#fff",
  },
  svg_container: {
    alignItems: "center",
  },
  font: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
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
    justifyContent: "space-between",
    marginBottom: 30,
  },
  alter_login_text: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  alter_login_icon: {
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
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
});
