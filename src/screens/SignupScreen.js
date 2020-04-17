import React from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import LoginForm from "../components/LoginForm";
import { signupThunk } from "../store/user/actions";

function SignupScreen(props) {
  const dispatch = useDispatch();

  return (
    <View>
      <LoginForm
        onSubmit={(firstName, lastName, email, password) =>
          dispatch(signupThunk(firstName, lastName, email, password))
        }
      />
    </View>
  );
}

// onSubmit={signupThunk(firstName, lastName, email, password)}
// signupThunk(firstName, lastName, email, password)

export default SignupScreen;
