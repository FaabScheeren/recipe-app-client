import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { selectMessage, selectAppState } from "../store/appState/selectors";
import { colors, spaces, fonts } from "../styles/base";

function MessageBox(props) {
  const message = useSelector(selectMessage);
  const AppState = useSelector(selectAppState);
  const showMessage = message !== null;

  // console.log("Message variable", message);
  // console.log("Message in messagebox component", showMessage);
  // console.log("Appstate in compoent", AppState);

  if (!showMessage) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    padding: spaces.md,
    marginBottom: spaces.md,
  },
  text: {
    color: "#ffffff",
  },
});

export default MessageBox;
