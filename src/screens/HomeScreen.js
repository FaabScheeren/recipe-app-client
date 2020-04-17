import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { recipeSelector } from "../store/recipes/selectors";

function HomeScreen(props) {
  const selectRecipes = useSelector(recipeSelector);
  console.log("RECIPE SELECTOR", selectRecipes);

  return (
    <View>
      <Text>Home screen</Text>
    </View>
  );
}

export default HomeScreen;
