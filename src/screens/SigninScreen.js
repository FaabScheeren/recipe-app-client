import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { loginThunk } from "../store/user/actions";
import { colors, spaces, fonts } from "../styles/base";

function SigninScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign in to your account</Text>
      <Input
        inputStyle={styles.inputText}
        containerStyle={styles.inputContainer}
        labelStyle={styles.inputLabel}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email adress"
        type="email"
        autoCapitalize="none"
        autoCorrect={false}
        label="Email adress"
      />
      <Input
        inputStyle={styles.inputText}
        containerStyle={styles.inputContainer}
        labelStyle={styles.inputLabel}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        label="Password"
      />

      <Button
        style={styles.button}
        title="Sign in"
        onPress={() => dispatch(loginThunk(email, password))}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text>Don't have an account? Sign up here.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: fonts.header,
    fontSize: fonts.md,
    marginBottom: 75,
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "30%",
  },
  button: {
    marginTop: 40,
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: fonts.subHeader2,
    fontSize: fonts.md,
  },
  inputContainer: {
    marginVertical: spaces.md,
    marginLeft: spaces.sm,
  },
  inputText: {
    fontFamily: fonts.text,
    fontSize: fonts.md,
  },
});

export default SigninScreen;
