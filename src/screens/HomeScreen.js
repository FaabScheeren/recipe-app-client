import React, { useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native-elements";
import { recipeSelector } from "../store/recipes/selectors";
import { selectUser, theState } from "../store/user/selector";
import { selectAppLoading } from "../store/appState/selectors";
import { getRecipes } from "../store/recipes/actions";
import { FontAwesome } from "@expo/vector-icons";
import HeaderHomepage from "../components/HeaderHomepage";
import { colors, spaces, fonts, dimensions } from "../styles/base";

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const selectRecipes = useSelector(recipeSelector);
  const state = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  console.log("State", state);

  const Footer = () => {
    if (!selectAppLoading) return null;

    return (
      <View
        style={{
          position: "relative",
          width: 30,
          height: 30,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderColor: "Black",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const getRecipesCall = () => {
    dispatch(getRecipes());
  };

  return (
    <>
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
                style={{ alignSelf: "stretch", height: 420 }}
              />
              <View>
                <Text
                  style={{ fontFamily: "poppins", fontSize: 24, margin: 5 }}
                >
                  {item.title}
                </Text>
                <Text>{moment(item.createdAt).fromNow()}</Text>
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
        ListHeaderComponent={<HeaderHomepage />}
        ListFooterComponent={Footer()}
        onEndReached={() => getRecipesCall()}
        onEndReachedThreshold={0}
      />
    </>
  );
}

const styles = StyleSheet.create({});

export default HomeScreen;
