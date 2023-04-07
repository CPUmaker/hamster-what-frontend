import { Formik } from "formik";
import React, { useEffect, useState, useContext } from "react";
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
import { ProfileContext } from "../../context/ProfileContext";
import { ThemeContext } from "../../context/ThemeContext";

const setAffiliationSchema = yup.object().shape({
  affiliation: yup
    .string()
    .max(200, "Must be 200 characters or less.")
    .required("Please enter your Affiliation."),
});

export default function SetAffiliation({ navigation }) {
  const [isEmit, setEmit] = useState(true);
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
      validationSchema={setAffiliationSchema}
      initialValues={{ affiliation: userProfile.affiliation }}
      onSubmit={(values) => {
        axios
          .patch(endpoints.profile, { affiliation: values.affiliation })
          .catch((error) => {
            console.log(`Set affiliation error: ${error}`);
          });
        console.log(values.affiliation);
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
          <Text style={styles.discription}>Please enter your affiliation.</Text>
          <View style={styles.textinput_container}>
            <TextInput
              placeholder="Affiliation"
              autoCapitalize="none"
              style={styles.text_input}
              value={values.affiliation}
              onChangeText={handleChange("affiliation")}
              onBlur={() => setFieldTouched("affiliation")}
            />
          </View>
          {errors.affiliation && (
            <Text style={styles.error_text}>{errors.affiliation}</Text>
          )}
          <TouchableOpacity
            style={[
              styles.submit_button,
              {
                backgroundColor:
                  touched.affiliation && isValid ? "#AD40AF" : "#A5C9CA",
              },
            ]}
            disabled={!touched.affiliation || !isValid}
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
  text_input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
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
