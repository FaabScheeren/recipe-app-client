import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { getRecipeDetails } from "../store/recipes/actions";
import { recipeDetailsSelector } from "../store/recipes/selectors";

function RecipeDetailsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const selectDetails = useSelector(recipeDetailsSelector);
  const { recipeId } = route.params;

  console.log("recipe id", recipeId);
  console.log("recipe details", selectDetails);

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
