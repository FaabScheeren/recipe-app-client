import React, { useEffect } from "react";
import { Card } from "react-native-elements";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserCategories } from "../store/user/actions";
import { selectUserCategories, selectUser } from "../store/user/selector";
import { colors, spaces, fonts } from "../styles/base";

function AccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectUserCategories);

  useEffect(() => {
    dispatch(getUserCategories());
  }, [dispatch]);

  return (
    <>
      <View style={styles.headerBlock}></View>
      <View style={styles.headerImageBox}>
        <Image
          source={{
            uri:
              "https://scontent-ams4-1.xx.fbcdn.net/v/t1.0-9/45945732_1966675536760578_7126707283714637824_n.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=ORyzNoFw__MAX8MVmqT&_nc_ht=scontent-ams4-1.xx&oh=0966db913d520440ab0f8266595b78b9&oe=5EC3B680",
          }}
          style={styles.headerImage}
        />
      </View>
      <Text style={styles.header}>Categories</Text>
      <FlatList
        numColumns={2}
        horizontal={false}
        data={categories}
        contentContainerStyle={styles.contentContainerStyle}
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
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubTitle}>
                {item.recipes.length} recipes
              </Text>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(category) => category.id.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: fonts.header,
    fontSize: fonts.lg,
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerBlock: {
    height: 130,
    backgroundColor: colors.primary,
  },
  headerImageBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
  },
  headerImage: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    borderWidth: 0.5,
  },
  cardImage: { height: 145, width: 145 },
  card: {
    padding: 0,
  },
  cardTitle: {
    fontFamily: fonts.subHeader2,
    fontSize: fonts.md,
    marginVertical: spaces.sm,
  },
  cardSubTitle: {
    fontFamily: fonts.subHeader,
    fontSize: fonts.sm,
  },
  contentContainerStyle: { paddingBottom: 20 },
});

export default AccountScreen;
