import React from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card, Image } from "react-native-elements";
import { selectUserCategories } from "../store/user/selector";
import { colors, spaces, fonts } from "../styles/base";

function RecipeOverviewScreen({ navigation, route }) {
  const { categoryId } = route.params;

  const categories = useSelector(selectUserCategories);

  const currentCategory = categories.find((category) => {
    return category.id === categoryId;
  });

  // console.log("Current category", currentCategory.name);

  navigation.setOptions({
    title: `${currentCategory.name}`,
  });

  return (
    <View>
      <Text style={styles.header}>
        This is the recipe overview page. Take a look of your own recipe and
        enjoy!
      </Text>

      <FlatList
        numColumns={2}
        horizontal={false}
        data={currentCategory.recipes}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RecipeDetails", {
                recipeId: item.id,
              })
            }
          >
            <Card containerStyle={styles.card}>
              <Image
                style={styles.cardImage}
                source={{
                  uri: `${item.media[0].file_name}`,
                }}
              />
              <Text style={styles.cardSubTitle}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(recipe) => recipe.id.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    fontFamily: fonts.header,
    fontSize: fonts.md,
    marginHorizontal: 20,
    marginTop: 20,
  },
  cardImage: { height: 175, width: 175 },
  card: {
    padding: 0,
    borderColor: colors.primary,
    borderWidth: 0.4,
  },
  cardSubTitle: {
    fontFamily: fonts.subHeader,
    fontSize: fonts.sm,
    // paddingHorizontal: 15,
    // paddingBottom: 15,
    padding: 15,
  },
  contentContainerStyle: { paddingBottom: spaces.lg },
});

export default RecipeOverviewScreen;
