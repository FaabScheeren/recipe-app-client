import React, { useState } from "react";
import { View, Text, Picker } from "react-native";
import { Input, Button } from "react-native-elements";

function AddRecipeScreen(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");

  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [stepsArray, setStepsArray] = useState([]);

  const submitHandlerSteps = (e) => {
    setStepsArray([...stepsArray, step]);
    setStep("");
  };

  const submitHandlerIngredients = (e) => {
    setIngredientsArray([...ingredientsArray, ingredient]);
    setIngredient("");
  };

  const handleSubmit = () => {
    console.log("Clicked");
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
        onSubmitEditing={(event) => submitHandlerSteps(event)}
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
        onSubmitEditing={(event) => submitHandlerIngredients(event)}
      />
      <Button title="Add recipe" onPress={() => handleSubmit()} />
    </View>
  );
}

export default AddRecipeScreen;
