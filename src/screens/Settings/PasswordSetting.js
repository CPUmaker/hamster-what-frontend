import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import { endpoints } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

export function PasswordSettingScreen({ route }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { logout } = useContext(AuthContext);
  const { isDarkModeEnabled } = useContext(ThemeContext);

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      // Send API request to update password
      axios
        .put(
          endpoints.change_password,
          (data = { old_password: currentPassword, new_password: newPassword })
        )
        .then(() => logout())
        .catch((error) => {
          console.log(`handleUpdatePassword: ${error}`);
        });
      setErrorMessage("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <View
      style={isDarkModeEnabled ? styles.dark_container : styles.light_container}
    >
      <View style={styles.header}>
        <Ionicons name="key-outline" size={32} color="#0066CC" />
        <Text
          style={[
            styles.headerText,
            { color: isDarkModeEnabled ? "#fff" : "#000" },
          ]}
        >
          Password Settings
        </Text>
      </View>
      <TextInput
        secureTextEntry={true}
        placeholder="Current Password"
        placeholderTextColor="#ccc"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        style={styles.input}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="New Password"
        placeholderTextColor="#ccc"
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirm New Password"
        placeholderTextColor="#ccc"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity onPress={handleUpdatePassword} style={styles.button}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  light_container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  dark_container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#242c40",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#0066CC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});

export function PasswordSettingWrapper({ navigation }) {
  const [password, setPassword] = useState("");

  const handlePasswordEnter = () => {
    // TODO: Check if the entered password is correct
    setPassword("");
    navigation.navigate("Password Setting");
  };

  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={true}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        keyboardType="numeric"
        onSubmitEditing={handlePasswordEnter}
      />
    </View>
  );
}
