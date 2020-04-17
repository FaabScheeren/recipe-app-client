import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// import LoginForm from "../components/LoginForm";
import { loginThunk } from "../store/user/actions";

function SigninScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Sign in to your account</Text>
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
        title="Sign in"
        onPress={() => dispatch(loginThunk(email, password))}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text>Don't have an account? Sign up here.</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SigninScreen;

// <LoginForm
//         onSubmit={(email, password) => dispatch(loginThunk(email, password))}
//       />
