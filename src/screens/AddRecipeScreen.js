import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  ScrollView,
  Text,
  Picker,
  Switch,
  StyleSheet,
} from "react-native";
import { Input, Button, Image } from "react-native-elements";
import { addRecipeThunk, getCategoriesThunk } from "../store/recipes/actions";
import { categoriesSelector } from "../store/recipes/selectors";
import { colors, spaces, fonts, dimensions } from "../styles/base";

function AddRecipeScreen({ navigation }) {
  const dispatch = useDispatch();
  const selectCategories = useSelector(categoriesSelector);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stepsArray, setStepsArray] = useState([]);
  const [cookingTime, setCookingTime] = useState("");
  const [category, setCategory] = useState("");
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [photo, setPhoto] = useState("");
  const [is_public, setIs_public] = useState(false);

  const [step, setStep] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  // Add step or ingredient to the arrays
  const submitHandler = (setArray, array, item, setItem) => {
    setArray([...array, item]);
    setItem("");
  };

  // Adding recipe to database

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(
      addRecipeThunk(
        title,
        description,
        stepsArray,
        cookingTime,
        category,
        ingredientsArray,
        photo,
        is_public
      )
    );
    navigation.navigate("Home");
  };

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
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView>
      <Image
        source={{
          uri: photo
            ? `${photo}`
            : "https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-1.jpg",
        }}
        style={{ width: 420, height: 420 }}
      />

      <Button
        title={!photo ? "Add image" : "Change image"}
        onPress={() => openImagePickerAsync()}
      />
      <Input
        labelStyle={styles.subHeaderStyle}
        inputStyle={styles.inputText}
        containerStyle={styles.container}
        onChangeText={(text) => setTitle(text)}
        label="Title"
      />
      <Input
        labelStyle={styles.subHeaderStyle}
        inputStyle={styles.inputText}
        containerStyle={styles.container}
        onChangeText={(text) => setDescription(text)}
        label="Description"
      />
      {stepsArray.map((step, index) => {
        return (
          <View key={step}>
            <Text>Step {index + 1}</Text>
            <Text>{step}</Text>
          </View>
        );
      })}
      <Input
        labelStyle={styles.subHeaderStyle}
        inputStyle={styles.inputText}
        containerStyle={styles.container}
        value={step}
        onChangeText={(text) => setStep(text)}
        label="Steps"
        blurOnSubmit={false}
        onSubmitEditing={(event) =>
          submitHandler(setStepsArray, stepsArray, step, setStep)
        }
      />
      <Input
        labelStyle={styles.subHeaderStyle}
        inputStyle={styles.inputText}
        containerStyle={styles.container}
        onChangeText={(text) => setCookingTime(text)}
        label="Cooking time"
        keyboardType="numeric"
      />
      <Text style={styles.text}>Choose a category for your recipe.</Text>
      <Picker
        selectedValue={category}
        onValueChange={(item) => setCategory(item)}
      >
        <Picker.Item label="Choose a category" value="no value" />
        {selectCategories.map((category) => {
          return (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.id}
            />
          );
        })}
      </Picker>
      {ingredientsArray.map((ingredient) => {
        return <Text key={ingredient}>{ingredient}</Text>;
      })}
      <Input
        labelStyle={styles.subHeaderStyle}
        inputStyle={styles.inputText}
        containerStyle={styles.container}
        value={ingredient}
        onChangeText={(text) => setIngredient(text)}
        label="Ingredients"
        blurOnSubmit={false}
        onSubmitEditing={(event) =>
          submitHandler(
            setIngredientsArray,
            ingredientsArray,
            ingredient,
            setIngredient
          )
        }
      />
      <Text style={styles.text}>
        Do you want to show this recipe on your public profile?
      </Text>
      <Switch
        style={styles.toggle}
        value={is_public}
        onValueChange={() => setIs_public(!is_public)}
      />
      <Button
        style={styles.button}
        title="Add recipe"
        onPress={() => handleSubmit()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stepTitleStyle: {
    fontFamily: fonts.subHeader2,
    fontSize: fonts.sm,
    marginHorizontal: spaces.md,
    marginTop: spaces.md,
  },
  subHeaderStyle: {
    fontFamily: fonts.subHeader2,
    fontSize: fonts.md,
    color: "black",
    marginVertical: spaces.sm,
  },
  text: {
    fontFamily: fonts.text,
    fontSize: fonts.sm,
    marginHorizontal: spaces.md,
  },
  inputText: {
    fontFamily: fonts.text,
    fontSize: fonts.sm,
    marginBottom: spaces.sm,
  },
  container: {
    margin: spaces.sm,
  },
  button: {
    width: 150,
    alignSelf: "center",
    marginVertical: spaces.lg,
  },
  toggle: {
    margin: spaces.sm,
  },
});

export default AddRecipeScreen;
