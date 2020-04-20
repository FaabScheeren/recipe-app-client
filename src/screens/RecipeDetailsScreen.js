import React from "react";
import { View, Text, StyleSheet } from "react-native";

function RecipeDetailsScreen({ navigation, route }) {
  const { recipeId } = route.params;

  return (
    <View>
      <Text>This is the recipe details page!</Text>
      <Text>{recipeId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default RecipeDetailsScreen;
