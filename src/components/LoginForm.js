import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { View } from "react-native";

export default function LoginForm({ onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
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
        onPress={() => onSubmit(firstName, lastName, email, password)}
      />
    </View>
  );
}
