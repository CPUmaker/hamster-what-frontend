import { Formik } from "formik";
import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL, endpoints } from "../../config";

import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import { ThemeContext } from "../../context/ThemeContext";

const setUsernameSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "Must be 6 characters or more.")
    .max(20, "Must be 20 characters or less.")
    .required("Please enter your preferred name."),
});

export default function SetUsername({ navigation }) {
  const [isEmit, setEmit] = useState(true);
  const { userInfo } = useContext(AuthContext);
  const { userProfile } = useContext(ProfileContext);
  const { isDarkModeEnabled } = useContext(ThemeContext);

  useEffect(() => {
    navigation.getParent().setOptions({ swipeEnabled: false });
  }, []);
  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      navigation.getParent().setOptions({ swipeEnabled: true });
    });
  }, [navigation]);

  return (
    //TODO onSubmit
    <Formik
      validationSchema={setUsernameSchema}
      initialValues={{ username: userProfile.user.username }}
      onSubmit={(values) => {
        axios
          .patch(endpoints.profile, { user: { username: values.username } })
          .catch((error) => {
            console.log(`Set user name error: ${error}`);
          });
        console.log(values.username);
        if (isEmit) {
          DeviceEventEmitter.emit("bio_receive", true);
          setEmit(false);
        }
        navigation.goBack();
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
        <View
          style={
            isDarkModeEnabled ? styles.dark_container : styles.light_container
          }
        >
          <Text style={styles.discription}>Please enter 6~20 characters.</Text>
          <View style={styles.textinput_container}>
            <TextInput
              placeholder="Username"
              autoCapitalize="none"
              style={
                isDarkModeEnabled
                  ? styles.dark_text_input
                  : styles.light_text_input
              }
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={() => setFieldTouched("username")}
            />
          </View>
          {errors.username && (
            <Text style={styles.error_text}>{errors.username}</Text>
          )}
          <TouchableOpacity
            style={[
              styles.submit_button,
              {
                backgroundColor:
                  touched.username && isValid ? "#AD40AF" : "#A5C9CA",
              },
            ]}
            disabled={!touched.username || !isValid}
            onPress={handleSubmit}
          >
            <Text style={styles.submit_text}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  light_container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dark_container: {
    flex: 1,
    backgroundColor: "#242c40",
  },
  discription: {
    margin: 20,
    fontSize: 16,
    color: "#888",
  },
  light_text_input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: "#000",
  },
  dark_text_input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: "#fff",
  },
  submit_button: {
    backgroundColor: "#AD40AF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    margin: 20,
  },
  submit_text: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
  error_text: {
    fontSize: 10,
    color: "#FF0D10",
    marginBottom: 5,
    marginLeft: 20,
  },
  textinput_container: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    margin: 20,
  },
});
