import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomNavigator } from "@react-navigation/bottom-tabs";

import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { hide } from "expo/build/launch/SplashScreen";

import { selectToken } from "./src/store/user/selector";

const Stack = createStackNavigator();

export default function Navigation() {
  const token = useSelector(selectToken);

  return (
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
        {token === null ? (
          <>
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                title: "Welcome!",
              }}
            />
            <Stack.Screen
              name="Login"
              component={SigninScreen}
              options={{
                title: "Welcome!",
                headerBackTitleVisible: false,
                headerBackImage: hide,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
