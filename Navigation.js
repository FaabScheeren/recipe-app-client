import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomNavigator } from "@react-navigation/bottom-tabs";

import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import HomeScreen from "./src/screens/HomeScreen";
import WhiteScreen from "./src/screens/WhiteScreen";
import RecipeDetailsScreen from "./src/screens/RecipeDetailsScreen";
import { hide } from "expo/build/launch/SplashScreen";

import { selectToken } from "./src/store/user/selector";
import { selectAppLoading } from "./src/store/appState/selectors";

import { tryLocalLogin } from "./src/store/user/actions";

const Stack = createStackNavigator();

export default function Navigation() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const appState = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(tryLocalLogin());
  }, [dispatch]);

  if (appState) {
    return <WhiteScreen />;
  }

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
            <Stack.Screen
              name="RecipeDetails"
              component={RecipeDetailsScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
