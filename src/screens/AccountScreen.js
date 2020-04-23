import React, { useEffect } from "react";
import { Card } from "react-native-elements";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserCategories } from "../store/user/actions";
import { selectUserCategories, selectUser } from "../store/user/selector";

function AccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectUserCategories);
  // const user = useSelector(selectUser);
  // console.log("Categories in screen", categories);

  useEffect(() => {
    dispatch(getUserCategories());
  }, [dispatch, getUserCategories]);

  return (
    <View>
      <View style={{ height: 130, backgroundColor: "#95c6b1" }}></View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: -100,
        }}
      >
        <Image
          source={{
            uri:
              "https://scontent-ams4-1.xx.fbcdn.net/v/t1.0-9/45945732_1966675536760578_7126707283714637824_n.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=ORyzNoFw__MAX8MVmqT&_nc_ht=scontent-ams4-1.xx&oh=0966db913d520440ab0f8266595b78b9&oe=5EC3B680",
          }}
          style={{
            height: 200,
            width: 200,
            borderRadius: 200 / 2,
            borderWidth: 0.5,
          }}
        />
      </View>
      <Text
        style={{
          marginHorizontal: 20,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Categories
      </Text>
      <FlatList
        numColumns={2}
        horizontal={false}
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RecipeOverview", {
                categoryId: item.id,
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
              <Text>{item.name}</Text>
              <Text>{item.recipes.length} recipes</Text>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(category) => category.id.toString()}
      />
    </View>
  );
}

export default AccountScreen;
