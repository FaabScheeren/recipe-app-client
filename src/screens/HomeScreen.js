import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Image, Button } from "react-native-elements";
import { recipeSelector } from "../store/recipes/selectors";
import { getRecipes } from "../store/recipes/actions";
import { signoutThunk } from "../store/user/actions";
import { FontAwesome } from "@expo/vector-icons";

function HomeScreen({ navigation }) {
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RecipeDetails", {
                  recipeId: item.id,
                })
              }
            >
              <Image
                source={{ uri: item.media[0].file_name }}
                style={{ width: 420, height: 420 }}
              />
              <View>
                <Text>{item.title}</Text>
                <Text>{item.createdAt}</Text>
                <Text>
                  {item.user.first_name} {item.user.last_name}
                </Text>
              </View>
              <View>
                <FontAwesome name="heart" />
                <FontAwesome name="comment" />
                <FontAwesome name="share" />
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(recipe) => recipe.id.toString()}
      />
    </>
  );
}

export default HomeScreen;
