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
  TouchableOpacity,
} from "react-native";
import { Input, Button, Image } from "react-native-elements";
// import { addRecipeThunk, getCategoriesThunk } from "../store/recipes/actions";
import {
  getRecipeDetails,
  changeRecipeThunk,
  removeRecipeComp,
  getCategoriesThunk,
} from "../store/recipes/actions";
import { categoriesSelector } from "../store/recipes/selectors";
import { recipeDetailsSelector } from "../store/recipes/selectors";
import { colors, spaces, fonts } from "../styles/base";
import { FontAwesome } from "@expo/vector-icons";

function AddRecipeScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const selectCategories = useSelector(categoriesSelector);
  const selectDetails = useSelector(recipeDetailsSelector);
  const { recipeId } = route.params;

  const [id, setId] = useState(selectDetails.id);
  const [title, setTitle] = useState(selectDetails.title);
  const [description, setDescription] = useState(selectDetails.description);
  const [stepsArray, setStepsArray] = useState(selectDetails.steps);
  const [cookingTime, setCookingTime] = useState(selectDetails.cooking_time);
  const time = cookingTime.toString();
  const [category, setCategory] = useState(selectDetails.categoryId);
  const [ingredientsArray, setIngredientsArray] = useState(
    selectDetails.ingredients
  );
  const [photo, setPhoto] = useState(selectDetails.media[0].file_name);
  const [is_public, setIs_public] = useState(selectDetails.is_public);
  const [removedIngredientsArray, setRemovedIngredientsArray] = useState([]);
  const [removedStepsArray, setRemovedStepsArray] = useState([]);

  const [stepsId, setStepsId] = useState(-1);
  const [ingredientId, setIngredientId] = useState(-1);
  const [step, setStep] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    dispatch(getRecipeDetails(recipeId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  // Add step or ingredient to the arrays
  const submitHandler = (
    setArray,
    array,
    item,
    setItem,
    property,
    indexId,
    setIndexId
  ) => {
    // set if setItem is false/empty return nul
    if (item !== "") {
      if (indexId === -1) {
        setArray([...array, { [`${property}`]: item }]);
        setItem("");
      } else {
        array[indexId][property] = item;
        setItem("");
        setIndexId(-1);
      }
    }
  };

  // console.log(removedIngredientsArray);

  const removeButtonHandler = (
    removedItem,
    array,
    setRemovedItemsArray,
    removedItemsArray,
    setArray,
    property
  ) => {
    const newArray = array.filter((item) => {
      return item.id !== removedItem.id;
    });
    setArray(newArray);
    setRemovedItemsArray([...removedItemsArray, removedItem]);
  };

  // Adding recipe to database
  const handleSubmit = () => {
    dispatch(removeRecipeComp(removedIngredientsArray, "ingredients"));
    dispatch(removeRecipeComp(removedStepsArray, "steps"));
    dispatch(
      changeRecipeThunk(
        id,
        title,
        description,
        stepsArray,
        cookingTime,
        category,
        ingredientsArray,
        photo,
        is_public,
        recipeId
      )
    );
    navigation.navigate("RecipeDetails", {
      recipeId,
    });
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

      <Button title="Change image" onPress={() => openImagePickerAsync()} />
      <Input
        labelStyle={styles.subHeaderStyle}
        inputStyle={styles.inputText}
        containerStyle={styles.container}
        onChangeText={(text) => setTitle(text)}
        label="Title"
        value={title}
      />
      <Input
        labelStyle={styles.subHeaderStyle}
        inputStyle={styles.inputText}
        containerStyle={styles.container}
        onChangeText={(text) => setDescription(text)}
        label="Description"
        value={description}
        multiline={true}
      />
      {stepsArray.map((step, index) => {
        return (
          <View key={step.description}>
            <Text style={styles.stepTitleStyle}>Step {index + 1}</Text>
            <View style={styles.viewPoint}>
              <Text style={styles.textPoint}>{step.description}</Text>
              <TouchableOpacity
                style={styles.editTouch}
                onPress={() => {
                  setStepsId(index), setStep(step.description);
                }}
              >
                <FontAwesome name="edit" style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editTouch}
                onPress={() =>
                  removeButtonHandler(
                    step,
                    stepsArray,
                    setRemovedStepsArray,
                    removedStepsArray,
                    setStepsArray,
                    "description"
                  )
                }
              >
                <FontAwesome name="trash" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      <Input
        labelStyle={styles.subHeaderStyle}
        inputStyle={styles.text}
        containerStyle={styles.container}
        value={step}
        onChangeText={(text) => setStep(text)}
        label="Steps"
        blurOnSubmit={false}
        onSubmitEditing={(event) =>
          submitHandler(
            setStepsArray,
            stepsArray,
            step,
            setStep,
            "description",
            stepsId,
            setStepsId
          )
        }
      />
      <Input
        labelStyle={styles.subHeaderStyle}
        inputStyle={styles.text}
        containerStyle={styles.container}
        onChangeText={(text) => setCookingTime(text)}
        label="Cooking time"
        value={time}
        type={Number}
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
      {ingredientsArray.map((ingredient, index) => {
        // console.log(ingredient);
        return (
          <View key={ingredient.product_name} style={styles.viewPoint}>
            <Text style={styles.textPoint}> - {ingredient.product_name}</Text>

            <TouchableOpacity
              style={styles.editTouch}
              onPress={() => {
                setIngredientId(index), setIngredient(ingredient.product_name);
              }}
            >
              <FontAwesome name="edit" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editTouch}
              onPress={() =>
                removeButtonHandler(
                  ingredient,
                  ingredientsArray,
                  setRemovedIngredientsArray,
                  removedIngredientsArray,
                  setIngredientsArray,
                  "product_name"
                )
              }
            >
              <FontAwesome name="trash" style={styles.icon} />
            </TouchableOpacity>
          </View>
        );
      })}
      <Input
        labelStyle={styles.subHeaderStyle}
        inputStyle={styles.text}
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
            setIngredient,
            "product_name",
            ingredientId,
            setIngredientId
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
        title="Edit recipe"
        onPress={() => handleSubmit()}
      />
      <View style={{ height: 50 }}></View>
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
    // marginHorizontal: spaces.sm,
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
    // marginHorizontal: spaces.sm,
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
  editTouch: {
    width: "7.5%",
    marginLeft: spaces.sm,
  },
  icon: {
    fontSize: 20,
    marginLeft: 5,
  },
  viewPoint: {
    flex: 1,
    flexDirection: "row",
  },
  textPoint: {
    fontFamily: fonts.text,
    fontSize: fonts.sm,
    marginHorizontal: spaces.md,
    width: "68%",
  },
});

export default AddRecipeScreen;
