import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function PaymentSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View style={styles.switch_container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(option1)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode === option1 ? "#AD40AF" : "#E4E4E4",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: getSelectionMode === option1 ? "white" : "#AD40AF",
            fontSize: 14,
            fontFamily: "Roboto-Medium",
          }}
        >
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(option2)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode === option2 ? "#AD40AF" : "#E4E4E4",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: getSelectionMode === option2 ? "white" : "#AD40AF",
            fontSize: 14,
            fontFamily: "Roboto-Medium",
          }}
        >
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  switch_container: {
    height: 44,
    width: "100%",
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    borderColor: "#AD40AF",
    flexDirection: "row",
    justifyContent: "center",
  },
});
