import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { getRecipeDetails } from "../store/recipes/actions";

function RecipeDetailsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { recipeId } = route.params;
  console.log("recipe id", recipeId);

  useEffect(() => {
    dispatch(getRecipeDetails(recipeId));
  }, [dispatch]);

  return (
    <View>
      <Text>This is the recipe details page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default RecipeDetailsScreen;
