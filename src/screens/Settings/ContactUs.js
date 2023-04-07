import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import { ThemeContext } from "../../context/ThemeContext";

export function ContactUsScreen() {
  const { isDarkModeEnabled } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: name,
        body: message,
        userId: 1,
      })
      .then((response) => {
        Alert.alert("Success", "Your message has been sent.");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          "There was an error sending your message. Please try again later."
        );
      });
  };

  return (
    <View
      style={isDarkModeEnabled ? styles.dark_container : styles.light_container}
    >
      <Text
        style={[styles.heading, { color: isDarkModeEnabled ? "#fff" : "#000" }]}
      >
        Contact Us
      </Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="#ccc" />
          <TextInput
            style={[
              styles.input,
              { color: isDarkModeEnabled ? "#ccc" : "#333" },
            ]}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#ccc" />
          <TextInput
            style={[
              styles.input,
              { color: isDarkModeEnabled ? "#ccc" : "#333" },
            ]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="chatbubble-outline" size={24} color="#ccc" />
          <TextInput
            style={[
              styles.input,
              styles.messageInput,
              { color: isDarkModeEnabled ? "#ccc" : "#333" },
            ]}
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={4}
            placeholderTextColor="#ccc"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  light_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  dark_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#242c40",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  form: {
    width: "80%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  messageInput: {
    height: 100,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#A04AAA",
    width: 370,
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
