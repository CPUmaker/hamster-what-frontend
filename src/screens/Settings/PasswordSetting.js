import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function PasswordSettingScreen ({ route }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      // TODO: Send API request to update password
      setErrorMessage('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="key-outline" size={32} color="#0066CC" />
        <Text style={styles.headerText}>Password Settings</Text>
      </View>
      <TextInput
        secureTextEntry={true}
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        style={styles.input}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        keyboardType="numeric"
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TouchableOpacity onPress={handleUpdatePassword} style={styles.button}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0066CC',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export function PasswordSettingWrapper ({ navigation }) {
  const [password, setPassword] = useState('');

  const handlePasswordEnter = () => {
    // TODO: Check if the entered password is correct
    setPassword('');
    navigation.navigate('Password Setting');
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
};


