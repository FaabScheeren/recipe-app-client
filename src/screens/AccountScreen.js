import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList } from "react-native";
import { getUserCategories } from "../store/user/actions";
import { selectUserCategories, selectUser } from "../store/user/selector";

function AccountScreen(props) {
  const dispatch = useDispatch();
  const categories = useSelector(selectUserCategories);
  const user = useSelector(selectUser);
  // console.log("Categories in screen", categories);

  useEffect(() => {
    dispatch(getUserCategories());
  }, [dispatch]);

  return (
    <View>
      <Text>Categories</Text>
      <FlatList
        data={categories}
        // keyExtractor={(recipe) => recipe.id.toString()}
        // renderItem={({ item }) => (
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(category) => category.id.toString()}
      />
    </View>
  );
}

export default AccountScreen;
