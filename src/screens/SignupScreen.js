import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button, Input } from "react-native-elements";
// import LoginForm from "../components/LoginForm";
import { signupThunk } from "../store/user/actions";
import { tryLocalLogin } from "../store/user/actions";

function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryLocalLogin());
  }, [dispatch]);

  return (
    <View>
      <Text>Sign up</Text>
      <Input
        onChangeText={(text) => setFirstName(text)}
        autoCapitalize="none"
        autoCorrect={false}
        label="Firstname"
        placeholder="Firstname"
      />
      <Input
        onChangeText={(text) => setLastName(text)}
        placeholder="Lastname"
        autoCapitalize="none"
        autoCorrect={false}
        label="Lastname"
      />
      <Input
        onChangeText={(text) => setEmail(text)}
        placeholder="Email adress"
        type="email"
        autoCapitalize="none"
        autoCorrect={false}
        label="Email adress"
      />
      <Input
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        label="Password"
      />

      <Button
        title="Sign up"
        onPress={() =>
          dispatch(signupThunk(firstName, lastName, email, password))
        }
      />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Already an account? Login here.</Text>
      </TouchableOpacity>
    </View>
  );
}

// onSubmit={signupThunk(firstName, lastName, email, password)}
// signupThunk(firstName, lastName, email, password)

export default SignupScreen;

// <LoginForm
// onSubmit={(firstName, lastName, email, password) =>
//   dispatch(signupThunk(firstName, lastName, email, password))
// }
// />
