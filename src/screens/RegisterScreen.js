import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
// import { useToast } from 'native-base';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import RegisterSVG from "../../assets/misc/register.svg";
import GoogleSVG from "../../assets/misc/google.svg";
import AppleSVG from "../../assets/misc/apple.svg";
import TwitterSVG from "../../assets/misc/twitter.svg";
import { BASE_URL } from "../config";

// const toast = useToast();

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const register = (email, username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      console.log("Inconsistent of password");
      // toast.show({title: 'Inconsistent of password', placement: 'top'});
    } else {
      axios
        .post(`${BASE_URL}/api/auth/register`, { email, username, password })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(JSON.stringify(error.response.data));
          // toast.show({title: error.response.data.username, placement: 'top'});
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={styles.svg_container}>
          <RegisterSVG height={300} width={300} />
        </View>

        <Text style={styles.font}>Register</Text>

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
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.text_input}
            value={email}
            onChangeText={(text) => setEmail(text)}
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
        </View>

        <View style={styles.text_input_container}>
          <AntDesign
            name="lock"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.text_input}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.login_button}
          onPress={() => register(email, username, password, confirmPassword)}
        >
          <Text style={styles.login_text}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.alter_login_text}>Or, register with ...</Text>

        <View style={styles.alter_login_container}>
          <TouchableOpacity style={styles.alter_login_icon} onPress={() => {}}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.alter_login_icon} onPress={() => {}}>
            <AppleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.alter_login_icon} onPress={() => {}}>
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.register_container}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.register_text}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
