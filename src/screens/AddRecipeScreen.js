import React, { useState } from "react";
import { View, Text, Picker } from "react-native";
import { Input, Button } from "react-native-elements";

function AddRecipeScreen(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([]);
  const [cookingTime, setCookingTime] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredientsArray, setIngredientsArray] = useState([]);

  const bang = (e) => {
    setIngredientsArray([...ingredientsArray, ingredient]);
    setIngredient("");
  };

  return (
    <View>
      <Text>Add a recipe here</Text>
      <Input onChangeText={(text) => setTitle(text)} label="Title" />
      <Input
        onChangeText={(text) => setDescription(text)}
        label="Description"
      />
      <Input onChangeText={(text) => setSteps(text)} label="Steps" />
      <Input
        onChangeText={(text) => setCookingTime(text)}
        label="Cooking time"
      />
      <Picker
        selectedValue={category}
        onValueChange={(item) => setCategory(item)}
      >
        <Picker.Item label="Choose a category" value="no value" />
        <Picker.Item label="Desserts" value="Desserts" />
        <Picker.Item label="Pasta" value="Pasta" />
        <Picker.Item label="Lunch" value="Lunch" />
      </Picker>
      {ingredientsArray.map((ingredient) => {
        return <Text key={ingredient}>{ingredient}</Text>;
      })}

      <Input
        value={ingredient}
        onChangeText={(text) => setIngredient(text)}
        label="Ingredients"
        // onKeyPress={(event) => bang(event)}
        onSubmitEditing={(event) => bang(event)}
      />
    </View>
  );
}

export default AddRecipeScreen;
