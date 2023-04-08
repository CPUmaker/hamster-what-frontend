import React, { useState, useContext } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../context/ThemeContext";

const deviceWidth = Dimensions.get('window').width;

const categories = [
  { id: 1, name: "Food", icon: "fast-food-outline", color: "#f39c12" },
  { id: 2, name: "Transportation", icon: "bus-outline", color: "#9b59b6" },
  { id: 3, name: "Shopping", icon: "cart-outline", color: "#3498db" },
  {
    id: 4,
    name: "Entertainment",
    icon: "game-controller-outline",
    color: "#e74c3c",
  },
  { id: 5, name: "Housing", icon: "home-outline", color: "#2c3e50" },
  { id: 6, name: "Utilities", icon: "flash-outline", color: "#27ae60" },
  { id: 7, name: "Other", icon: "file-tray", color: "#8D7B68" },
];

export function CategorySelectionExpense(setSelectedCategoryName) {
  const { isDarkModeEnabled } = useContext(ThemeContext);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryPress = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, { color: isDarkModeEnabled ? "#ccc" : "#333" }]}
      >
        Select a category:
      </Text>
      <ScrollView>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategoryId === category.id && {
                backgroundColor: category.color,
              },
            ]}
            onPress={() => handleCategoryPress(category.id, category.name)}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name={category.icon} size={32} color={category.color} />
            </View>
            <Text
              style={[
                styles.categoryName,
                { color: isDarkModeEnabled ? "#ccc" : "#333" },
                selectedCategoryId === category.id && { color: "#ffffff" },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoryButton: {
    width: deviceWidth * 0.9,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoryIcon: {
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    marginRight: 10,
    padding: 10,
  },
  categoryName: {
    fontSize: 16,
    color: "#333333",
  },
});
