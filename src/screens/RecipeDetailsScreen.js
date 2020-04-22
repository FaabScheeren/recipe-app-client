import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Button, Divider, List, ListItem } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import { getRecipeDetails } from "../store/recipes/actions";
import { recipeDetailsSelector } from "../store/recipes/selectors";
import { selectUser } from "../store/user/selector";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

function RecipeDetailsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const selectCurrentUser = useSelector(selectUser);
  const selectDetails = useSelector(recipeDetailsSelector);
  const { recipeId } = route.params;

  useEffect(() => {
    dispatch(getRecipeDetails(recipeId));
  }, [dispatch]);

  if (selectDetails.userId === selectCurrentUser.id) {
    navigation.setOptions({
      headerRight: () => <Icon name="edit" size={25} color="#fff" />,
    });
  }

  // console.log("user", selectCurrentUser);
  // console.log("RECIPE DETAILS IN DETAILSSCREEN", selectDetails.userId);
  // console.log("RECIPE DETAILS IN ", selectCurrentUser.id);

  return (
    selectDetails && (
      <ScrollView>
        <Image
          source={{ uri: selectDetails.media[0].file_name }}
          style={{ width: 420, height: 420 }}
        />
        <Text>{selectDetails.title}</Text>
        <Text>{selectDetails.category.name}</Text>
        <Divider style={{ margin: 20 }} />
        <Text>{selectDetails.createdAt}</Text>
        <Text>
          {selectDetails.user.first_name} {selectDetails.user.last_name}
        </Text>
        <View>
          <FontAwesome name="heart" style={styles.icons} />
          <FontAwesome name="comment" style={styles.icons} />
          <FontAwesome name="share" style={styles.icons} />
        </View>
        <Text style={styles.headerStyle}>Ingredients</Text>
        {selectDetails.ingredients.map((ingredient, index) => {
          return <Text key={index}>- {ingredient.product_name}</Text>;
        })}
        <Text style={styles.headerStyle}>Description</Text>
        <Text>{selectDetails.description}</Text>
        <View>
          {selectDetails.steps.map((step, index) => {
            return (
              <View key={index + 1}>
                <Text style={styles.stepHeaderStyle}>Step {index + 1}</Text>
                <Text>{step.description}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    )
  );
}

const styles = StyleSheet.create({
  icons: {
    fontSize: 30,
  },
  headerStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  stepHeaderStyle: {
    fontWeight: "bold",
  },
});

export default RecipeDetailsScreen;

// <Image
// source={{ uri: selectDetails.media[0].file_name }}
// style={{ width: 420, height: 420 }}
// />
// <Text>{selectDetails.title}</Text>
// <Text>{selectDetails.category.name}</Text>
// <Text>{selectDetails.createdAt}</Text>
// <Text>
// {selectDetails.user.first_name} {selectDetails.user.last_name}
// </Text>
