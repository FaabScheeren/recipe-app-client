import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Picker } from "react-native";
import { Input, Button } from "react-native-elements";
import { addRecipeThunk, getCategoriesThunk } from "../store/recipes/actions";
import { categoriesSelector } from "../store/recipes/selectors";

function AddRecipeScreen({ navigation }) {
  const dispatch = useDispatch();
  const selectCategories = useSelector(categoriesSelector);

  // console.log("Categories", selectCategories);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");

  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [stepsArray, setStepsArray] = useState([]);

  const submitHandler = (setArray, array, item, setItem) => {
    setArray([...array, item]);
    setItem("");
  };

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
        ingredientsArray
      )
    );
    navigation.navigate("Home");
  };

  return (
    <View>
      <Input onChangeText={(text) => setTitle(text)} label="Title" />
      <Input
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
        keyboardType="numeric"
      />
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
      <Button title="Add recipe" onPress={() => handleSubmit()} />
    </View>
  );
}

export default AddRecipeScreen;
