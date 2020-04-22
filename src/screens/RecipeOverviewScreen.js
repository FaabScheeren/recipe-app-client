import React from "react";
import { useSelector } from "react-redux";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Card, Image } from "react-native-elements";
import { categoriesSelector } from "../store/recipes/selectors";
import { selectUser, selectUserCategories } from "../store/user/selector";

function RecipeOverviewScreen({ navigation, route }) {
  const { categoryId } = route.params;
  console.log("Category id", categoryId);

  // const categories = useSelector(categoriesSelector);
  // const user = useSelector(selectUser);
  const categories = useSelector(selectUserCategories);
  // console.log("CATEGORIES", categories);

  // const categoryRecipes = categories.filter((recipe) => {

  // })

  const currentCategory = categories.find((category) => {
    return category.id === categoryId;
  });

  console.log("Current category", currentCategory);

  return (
    <View>
      <Text>
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
            <Card>
              <Image
                source={{
                  uri:
                    "https://static.ah.nl/static/recepten/img_071780_1600x_JPG.jpg",
                }}
                style={{ height: 145, width: 145 }}
              />
              <Text>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(recipe) => recipe.id.toString()}
      />
    </View>
  );
}

export default RecipeOverviewScreen;
