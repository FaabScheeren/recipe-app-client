import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { View, ScrollView, Text, Picker, Switch } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import { addRecipeThunk, getCategoriesThunk } from "../store/recipes/actions";
import { getRecipeDetails } from "../store/recipes/actions";
import { categoriesSelector } from "../store/recipes/selectors";
import { recipeDetailsSelector } from "../store/recipes/selectors";

function AddRecipeScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const selectCategories = useSelector(categoriesSelector);
  const selectDetails = useSelector(recipeDetailsSelector);
  const { recipeId } = route.params;

  // console.log("Recipe details", selectDetails);

  const defaultStepsArray = selectDetails.steps.map((step) => {
    return step.description;
  });

  const defaultIngredientsArray = selectDetails.ingredients.map(
    (ingredient) => {
      return ingredient.product_name;
    }
  );

  console.log("Default steps", defaultStepsArray);

  const [title, setTitle] = useState(selectDetails.title);
  const [description, setDescription] = useState(selectDetails.description);
  // const [stepsArray, setStepsArray] = useState(selectDetails.steps);
  const [stepsArray, setStepsArray] = useState(defaultStepsArray);
  const [cookingTime, setCookingTime] = useState(selectDetails.cooking_time);
  const time = cookingTime.toString();
  const [category, setCategory] = useState(selectDetails.categoryId);
  // const [ingredientsArray, setIngredientsArray] = useState(
  //   selectDetails.ingredients
  // );
  const [ingredientsArray, setIngredientsArray] = useState(
    defaultIngredientsArray
  );
  const [photo, setPhoto] = useState(selectDetails.media[0].file_name);
  const [is_public, setIs_public] = useState(selectDetails.is_public);

  const [step, setStep] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  console.log("INGREDIENTS", selectDetails.ingredients);

  useEffect(() => {
    dispatch(getRecipeDetails(recipeId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  // Add step or ingredient to the arrays
  const submitHandler = (setArray, array, item, setItem) => {
    setArray([...array, item]);
    setItem("");
  };

  // Adding recipe to database
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

      <Button title="Add image" onPress={() => openImagePickerAsync()} />
      <Input
        onChangeText={(text) => setTitle(text)}
        label="Title"
        value={title}
      />
      <Input
        onChangeText={(text) => setDescription(text)}
        label="Description"
        value={description}
        multiline={true}
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
        value={step}
        onChangeText={(text) => setStep(text)}
        label="Steps"
        blurOnSubmit={false}
        onSubmitEditing={(event) =>
          submitHandler(setStepsArray, stepsArray, step, setStep)
        }
      />
      <Input
        onChangeText={(text) => setCookingTime(text)}
        label="Cooking time"
        value={time}
        type={Number}
        keyboardType="numeric"
      />
      <Text>Choose a category for your recipe.</Text>
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
      <Text>Do you want to show this recipe on your public profile?</Text>
      <Switch
        value={is_public}
        onValueChange={() => setIs_public(!is_public)}
      />
      <Button title="Add recipe" onPress={() => handleSubmit()} />
    </ScrollView>
  );
}

export default AddRecipeScreen;
