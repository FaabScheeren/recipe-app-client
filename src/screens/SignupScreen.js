import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { signupThunk } from "../store/user/actions";
import MessageBox from "../components/MessageBox";
import { colors, spaces, fonts } from "../styles/base";
import { clearMessage } from "../store/appState/actions";

function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      dispatch(clearMessage());
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <ScrollView ContainerStyle={styles.container}>
      <MessageBox />
      <Text style={styles.header}>Sign up</Text>
      <Input
        inputStyle={styles.inputText}
        containerStyle={styles.inputContainer}
        labelStyle={styles.inputLabel}
        onChangeText={(text) => setFirstName(text)}
        autoCapitalize="none"
        autoCorrect={false}
        label="Firstname"
        placeholder="Firstname"
      />
      <Input
        inputStyle={styles.inputText}
        containerStyle={styles.inputContainer}
        labelStyle={styles.inputLabel}
        onChangeText={(text) => setLastName(text)}
        placeholder="Lastname"
        autoCapitalize="none"
        autoCorrect={false}
        label="Lastname"
      />
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
        title="Sign up"
        onPress={() =>
          dispatch(signupThunk(firstName, lastName, email, password))
        }
      />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.text}>Already an account? Login here.</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: fonts.header,
    fontSize: fonts.md,
    marginBottom: 50,
    marginVertical: 75,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "15%",
  },
  button: {
    marginTop: 40,
    marginBottom: 20,
    width: "40%",
    alignSelf: "center",
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
  text: {
    marginHorizontal: spaces.md,
  },
});

export default SignupScreen;
