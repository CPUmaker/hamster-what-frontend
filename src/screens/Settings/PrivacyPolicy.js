import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export function PrivacyPolicyScreen () {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Personal Information</Text>
        <Text style={styles.sectionText}>
          We may collect personal information from you, such as your name, email address, phone number, and other information you provide. We use this information for the purpose of providing our services to you and improving our services.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Cookies</Text>
        <Text style={styles.sectionText}>
          We may use cookies and similar technologies to analyze trends, administer the website, track users' movements around the website, and to gather demographic information about our user base as a whole.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Security</Text>
        <Text style={styles.sectionText}>
          We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Changes to this Privacy Policy</Text>
        <Text style={styles.sectionText}>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Contact Us</Text>
        <Text style={styles.sectionText}>
          If you have any questions about this Privacy Policy, please contact us using the contact form.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
});