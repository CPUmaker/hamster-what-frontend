import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function NotificationSettingsScreen () {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);

  const handleNotificationsSwitch = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
  };

  const handleSoundSwitch = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  const handleVibrationSwitch = () => {
    setIsVibrationEnabled(!isVibrationEnabled);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="notifications-outline" size={32} color="#0066CC" />
        <Text style={styles.headerText}>Notification Settings</Text>
      </View>
      <View style={styles.notificationSetting}>
        <Text style={styles.notificationSettingText}>Enable Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={handleNotificationsSwitch}
          thumbColor="#fff"
        //   trackColor={{ true: '#0066CC' }}
        />
      </View>
      <View style={styles.notificationSetting}>
        <Text style={styles.notificationSettingText}>Enable Sound</Text>
        <Switch
          value={isSoundEnabled}
          onValueChange={handleSoundSwitch}
          disabled={!isNotificationsEnabled}
          thumbColor="#fff"
        //   trackColor={{ true: '#0066CC' }}
        />
      </View>
      <View style={styles.notificationSetting}>
        <Text style={styles.notificationSettingText}>Enable Vibration</Text>
        <Switch
          value={isVibrationEnabled}
          onValueChange={handleVibrationSwitch}
          disabled={!isNotificationsEnabled}
          thumbColor="#fff"
        //   trackColor={{ true: '#0066CC' }}
        />
      </View>
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
    fontSize: 18,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: "Roboto-Medium",
  },
  notificationSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  notificationSettingText: {
    fontSize: 18,
  },
});
