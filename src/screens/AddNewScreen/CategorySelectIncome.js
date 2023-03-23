import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';

const categories = [
  { id: 1, name: 'Salary', icon: null, other_icon: <FontAwesome5 name="hand-holding-usd" size={30} color={"#f39c12"}/>, color: '#f39c12' },
  { id: 2, name: 'Interest', icon: null, other_icon: <MaterialCommunityIcons name="bank-outline" size={30} color={"#9b59b6"} />, color: '#9b59b6' },
  { id: 3, name: 'Investments', icon: null, other_icon: <MaterialIcons name="attach-money" size={30} color={"#3498db"} />, color: '#3498db' },
  { id: 4, name: 'Child benefit', icon: null, other_icon: <MaterialCommunityIcons name="baby-face-outline" size={30} color={"#f39c12"} />, color: '#f39c12' },
  { id: 5, name: 'Pension', icon: null, other_icon: <Entypo name="shield" size={30} color="#4E6E81" />, color: '#4E6E81' },
  { id: 6, name: 'Income', icon: null, other_icon: <FontAwesome5 name="money-bill-alt" size={30} color="#68B984" />, color: '#68B984' },
];

export function CategorySelectionIncome(setSelectedCategoryName) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryPress = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId)
    setSelectedCategoryName(categoryName)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a category:</Text>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            selectedCategoryId === category.id && { backgroundColor: category.color },
          ]}
          onPress={() => handleCategoryPress(category.id, category.name)}
        >
          <View style={styles.categoryIcon}>
          {category.icon === null ?
            category.other_icon
            : <Ionicons name={category.icon} size={32} color={category.color} />}
          </View>
          <Text style={[styles.categoryName, selectedCategoryId === category.id && { color: '#ffffff' }]}>{category.name}</Text>
        </TouchableOpacity>
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryButton: {
    width: 380,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoryIcon: {
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    marginRight: 10,
    padding: 10,
  },
  categoryName: {
    fontSize: 16,
    color: '#333333',
  },
});
