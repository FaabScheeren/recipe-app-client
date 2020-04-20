import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Image, Button } from "react-native-elements";
import { recipeSelector } from "../store/recipes/selectors";
import { getRecipes } from "../store/recipes/actions";
import { signoutThunk } from "../store/user/actions";

function HomeScreen(props) {
  const dispatch = useDispatch();
  const selectRecipes = useSelector(recipeSelector);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <>
      <Text>Home screen</Text>
      <Button title="Sign out" onPress={() => dispatch(signoutThunk())} />
      <FlatList
        data={selectRecipes}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.media[0].file_name }}
              style={{ width: 420, height: 420 }}
            />

            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={(recipe) => recipe.id.toString()}
      />
    </>
  );
}

export default HomeScreen;
