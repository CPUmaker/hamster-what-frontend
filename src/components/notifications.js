import * as Notifications from "expo-notifications";

const dailyReminder = async () => {
  // Schedule the notification to be triggered at 8 pm every day
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Reminder",
      body: "This is your daily reminder",
    },
    trigger: {
      //   hour: 14, // Set the notification to be triggered at 8 pm (20:00)
      //   minute: 2,
      //   repeats: true, // Set the notification to repeat every day
      seconds: 30,
    },
  });
};

export default dailyReminder;
