import React from "react";
import { useSelector } from "react-redux";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Card, Image } from "react-native-elements";
import { selectUserCategories } from "../store/user/selector";

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

  // console.log("Current category", currentCategory);

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
                  uri: `${item.media[0].file_name}`,
                }}
                style={{ height: 145, width: 145 }}
              />
              <Text style={{ width: 145 }}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(recipe) => recipe.id.toString()}
      />
    </View>
  );
}

export default RecipeOverviewScreen;
