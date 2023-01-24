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
import { Formik } from "formik";
import * as Yup from "yup";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import RegisterSVG from "../../assets/misc/register.svg";
import GoogleSVG from "../../assets/misc/google.svg";
import AppleSVG from "../../assets/misc/apple.svg";
import TwitterSVG from "../../assets/misc/twitter.svg";
import { BASE_URL } from "../config";

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Must be 6 characters or more.")
    .max(20, "Must be 20 characters or less.")
    .required("Please enter your preferred name."),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email address."),
  password: Yup.string()
    .min(8, "Must be 8 characters or more.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Must contain 8 characters, at least one uppercase letter, one lowercase letter, one numeric character, and one special character."
    )
    .required("Please enter your password."),
  confirmPassword: Yup.string()
    .min(8, "Must be 8 characters or more.")
    .oneOf(Yup.ref("password"), "Your passwords do not match")
    .required("Confirm password is required."),
});

export default function RegisterScreen({ navigation }) {
  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values) => {
        axios
          .post(`${BASE_URL}/api/auth/register`, {
            email: values.email,
            username: values.username,
            password: values.password,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(JSON.stringify(error.response.data));
            // toast.show({title: error.response.data.username, placement: 'top'});
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
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
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={() => setFieldTouched("username")}
              />
              {touched.username && errors.username && (
                <Text style={styles.error_text}>{errors.username}</Text>
              )}
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
                value={values.email}
                onChangeText={handleChange("email")}
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
                value={values.password}
                onChangeText={handleChange("password")}
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
                value={values.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword")}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.login_button,
                { backgroundColor: isValid ? "#AD40AF" : "#A5C9CA" },
              ]}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.login_text}>Register</Text>
            </TouchableOpacity>

            <Text style={styles.alter_login_text}>Or, register with ...</Text>

            <View style={styles.alter_login_container}>
              <TouchableOpacity
                style={styles.alter_login_icon}
                onPress={() => {}}
              >
                <GoogleSVG height={24} width={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.alter_login_icon}
                onPress={() => {}}
              >
                <AppleSVG height={24} width={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.alter_login_icon}
                onPress={() => {}}
              >
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
      )}
    </Formik>
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
  error_text: {
    fontSize: 10,
    color: "#FF0D10",
  },
});
