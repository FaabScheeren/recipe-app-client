import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Image, Button, Divider, List, ListItem } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import { getRecipeDetails } from "../store/recipes/actions";
import { recipeDetailsSelector } from "../store/recipes/selectors";
import { selectUser } from "../store/user/selector";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors, spaces, fonts, dimensions } from "../styles/base";

function RecipeDetailsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const selectCurrentUser = useSelector(selectUser);
  const selectDetails = useSelector(recipeDetailsSelector);
  const { recipeId } = route.params;

  useEffect(() => {
    dispatch(getRecipeDetails(recipeId));
  }, []);

  const userId = selectDetails ? selectDetails.userId : -1;

  if (userId) {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Edit", {
              recipeId,
            })
          }
        >
          <Icon name="edit" size={25} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }

  return (
    selectDetails && (
      <ScrollView>
        <Image
          source={{ uri: selectDetails.media[0].file_name }}
          style={styles.image}
        />
        <Text style={styles.title}>{selectDetails.title}</Text>
        <Text style={styles.subTitle}>{selectDetails.category.name}</Text>
        <Divider style={{ margin: 20 }} />
        <Text style={styles.subTitle}>
          {moment(selectDetails.createdAt).fromNow()}
        </Text>
        <Text style={styles.subTitle}>
          {selectDetails.user.first_name} {selectDetails.user.last_name}
        </Text>
        <View>
          <FontAwesome name="heart" style={styles.icon} />
          <FontAwesome name="comment" style={styles.icon} />
          <FontAwesome name="share" style={styles.icon} />
        </View>
        <Text style={styles.subHeaderStyle}>Ingredients</Text>
        {selectDetails.ingredients.map((ingredient, index) => {
          return (
            <Text style={styles.list} key={index}>
              - {ingredient.product_name}
            </Text>
          );
        })}
        <Text style={styles.subHeaderStyle}>Description</Text>
        <Text style={styles.text}>{selectDetails.description}</Text>
        <View>
          {selectDetails.steps.map((step, index) => {
            return (
              <View key={index + 1}>
                <Text style={styles.stepTitleStyle}>Step {index + 1}</Text>
                <Text style={styles.text}>{step.description}</Text>
              </View>
            );
          })}
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
    )
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.header,
    fontSize: fonts.lg,
    marginHorizontal: spaces.sm,
    marginTop: spaces.sm,
  },
  subTitle: {
    fontFamily: fonts.subHeader,
    marginLeft: 10,
    marginBottom: 5,
  },
  subHeaderStyle: {
    fontFamily: fonts.subHeader2,
    // fontWeight: "bold",
    fontSize: fonts.md,
    marginHorizontal: spaces.sm,
    marginVertical: spaces.md,
  },
  list: {
    fontFamily: fonts.text,
    fontSize: fonts.sm,
    marginHorizontal: spaces.md,
  },
  text: {
    fontFamily: fonts.text,
    fontSize: fonts.sm,
    marginHorizontal: spaces.sm,
    marginBottom: spaces.md,
  },
  stepTitleStyle: {
    fontFamily: fonts.subHeader2,
    fontSize: fonts.sm,
    marginHorizontal: spaces.sm,
  },
  image: { alignSelf: "stretch", height: 420 },
  icon: {
    fontSize: 30,
    color: colors.primary,
  },
});

export default RecipeDetailsScreen;
