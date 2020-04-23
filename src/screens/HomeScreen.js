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
import { selectUser } from "../store/user/selector";
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
                style={styles.image}
              />
              <Text style={styles.title}>{item.title}</Text>
              <View>
                <Text style={styles.subTitle}>
                  {moment(item.createdAt).fromNow()}
                </Text>
                <Text style={styles.subTitle}>
                  {item.user.first_name} {item.user.last_name}
                </Text>
              </View>
              <View>
                <FontAwesome name="heart" style={styles.icon} />
                <FontAwesome name="comment" style={styles.icon} />
                <FontAwesome name="share" style={styles.icon} />
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

const styles = StyleSheet.create({
  image: { alignSelf: "stretch", height: 420 },
  title: {
    fontFamily: fonts.header,
    fontSize: 24,
    marginHorizontal: 10,
    marginTop: 10,
  },
  subTitle: {
    fontFamily: fonts.subHeader,
    marginLeft: 10,
    marginBottom: 15,
  },
  icon: {
    fontSize: 30,
    color: colors.primary,
  },
});

export default HomeScreen;
