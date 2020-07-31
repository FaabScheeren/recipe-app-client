import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
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
import { getUserCategories, saveProfileImage } from "../store/user/actions";
import { selectUserCategories, selectUser } from "../store/user/selector";
import { colors, spaces, fonts } from "../styles/base";

function AccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectUserCategories);
  const user = useSelector(selectUser);
  const [photo, setPhoto] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  let userImage = "";

  console.log("USER", user);

  useEffect(() => {
    dispatch(getUserCategories());
  }, [dispatch]);

  if (user.userImage) {
    userImage = user.userImage;
  } else {
    userImage =
      "https://res.cloudinary.com/dcmi604u7/image/upload/v1588614214/profile-placeholder-img_uik3kq.jpg";
  }

  // Image picker
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dcmi604u7/upload";
  const presetName = "wkfzg6yb";

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],

      base64: true,
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });

    const base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    const data = {
      file: base64Img,
      upload_preset: presetName,
    };

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        const data = await r.json();

        setPhoto(data.url);
        // useEffect(() => {
        dispatch(saveProfileImage(photo));
        // }, [dispatch]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <View style={styles.headerBlock}></View>
      <View style={styles.headerImageBox}>
        <TouchableOpacity onPress={() => openImagePickerAsync()}>
          <Image
            source={{
              uri: userImage,
            }}
            style={styles.headerImage}
          />
        </TouchableOpacity>
        <Text style={styles.header}>
          {user.first_name} {user.last_name}
        </Text>
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
                  uri:
                    item.image ||
                    "https://res.cloudinary.com/dcmi604u7/image/upload/v1588615443/placeholder-category_bzjaen.png",
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
