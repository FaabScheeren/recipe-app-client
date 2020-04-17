import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import ErrorBoundary from "./ErrorBoundary";

import {
  NavigationContainer,
  createSwitchNavigator,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomNavigator } from "@react-navigation/bottom-tabs";

import SignupScreen from "./src/screens/SignupScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Signup"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: "Welcome!" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ErrorBoundary>
  );
}
