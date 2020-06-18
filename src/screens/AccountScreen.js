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
  const user = useSelector(selectUser);
  let userImage = "";

  useEffect(() => {
    dispatch(getUserCategories());
  }, [dispatch]);

  if (user.userImage) {
    userImage = user.userImage;
  } else {
    userImage =
      "https://www.mvwautotechniek.nl/wp-content/uploads/2019/10/placeholder.png";
  }

  return (
    <>
      <View style={styles.headerBlock}></View>
      <View style={styles.headerImageBox}>
        <Image
          source={{
            // uri: user.userImage,
            uri: userImage,
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
            <Card containerStyle={styles.card}>
              <Image
                source={{
                  uri: userImage,
                  // uri: item.image,
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
  cardImage: { height: 175, width: 175 },
  card: {
    padding: 0,
    borderColor: colors.primary,
    borderWidth: 0.4,
  },
  cardTitle: {
    fontFamily: fonts.subHeader2,
    fontSize: fonts.md,
    marginVertical: spaces.sm,
    paddingHorizontal: 15,
  },
  cardSubTitle: {
    fontFamily: fonts.subHeader,
    fontSize: fonts.sm,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  contentContainerStyle: { paddingBottom: spaces.lg },
});

export default AccountScreen;
