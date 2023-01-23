import React from "react";
import { View, Text } from "react-native";

export default function BillDetailsScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bill Details Screen</Text>
      <Text>{route.params?.title}</Text>
    </View>
  );
}
