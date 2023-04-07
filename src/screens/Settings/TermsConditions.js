import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

export function TermsAndConditionsScreen() {
  const { isDarkModeEnabled } = useContext(ThemeContext);

  return (
    <ScrollView
      style={isDarkModeEnabled ? styles.dark_container : styles.light_container}
    >
      <Text
        style={[styles.heading, { color: isDarkModeEnabled ? "#fff" : "#000" }]}
      >
        Terms & Conditions
      </Text>
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionHeading,
            { color: isDarkModeEnabled ? "#fff" : "#000" },
          ]}
        >
          Introduction
        </Text>
        <Text style={styles.sectionText}>
          These terms and conditions govern your use of this mobile application.
          By using this application, you accept these terms and conditions in
          full. If you disagree with these terms and conditions or any part of
          these terms and conditions, you must not use this application.
        </Text>
      </View>
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionHeading,
            { color: isDarkModeEnabled ? "#fff" : "#000" },
          ]}
        >
          License to use application
        </Text>
        <Text style={styles.sectionText}>
          Unless otherwise stated, we own the intellectual property rights in
          the application and material on the application. Subject to the
          license below, all these intellectual property rights are reserved.
          You may view, download for caching purposes only, and print pages from
          the application for your own personal use, subject to the restrictions
          set out below and elsewhere in these terms and conditions.
        </Text>
      </View>
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionHeading,
            { color: isDarkModeEnabled ? "#fff" : "#000" },
          ]}
        >
          Restrictions
        </Text>
        <Text style={styles.sectionText}>
          You must not use this application in any way that causes, or may
          cause, damage to the application or impairment of the availability or
          accessibility of the application; or in any way which is unlawful,
          illegal, fraudulent or harmful, or in connection with any unlawful,
          illegal, fraudulent or harmful purpose or activity.
        </Text>
      </View>
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionHeading,
            { color: isDarkModeEnabled ? "#fff" : "#000" },
          ]}
        >
          Disclaimer
        </Text>
        <Text style={styles.sectionText}>
          The application is provided "as is" without any representations or
          warranties, express or implied. We make no representations or
          warranties in relation to the application or the information and
          materials provided on the application.
        </Text>
      </View>
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionHeading,
            { color: isDarkModeEnabled ? "#fff" : "#000" },
          ]}
        >
          Governing Law
        </Text>
        <Text style={styles.sectionText}>
          These terms and conditions will be governed by and construed in
          accordance with the laws of [insert jurisdiction], and any disputes
          relating to these terms and conditions will be subject to the
          exclusive jurisdiction of the courts of [insert jurisdiction].
        </Text>
      </View>
    </ScrollView>
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
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#999",
  },
});
