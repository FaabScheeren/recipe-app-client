import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createBottomNavigator,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import HomeScreen from "./src/screens/HomeScreen";
import WhiteScreen from "./src/screens/WhiteScreen";
import RecipeDetailsScreen from "./src/screens/RecipeDetailsScreen";
import AddRecipeScreen from "./src/screens/AddRecipeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { hide } from "expo/build/launch/SplashScreen";

import { selectToken } from "./src/store/user/selector";
import { selectAppLoading } from "./src/store/appState/selectors";

import { tryLocalLogin } from "./src/store/user/actions";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        title="Home"
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        title="Add recipe"
        name="Addrecipes"
        component={AddRecipeScreen}
        options={{ title: "Add recipe", headerTitle: "Add recipe" }}
      />
      <Tab.Screen
        title="Account"
        name="Account"
        component={AccountScreen}
        options={{ title: "Account" }}
      />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Addrecipes":
      return "Add recipe";
    case "Account":
      return "Account";
  }
}

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
            backgroundColor: "#95c6b1",
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
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ route }) => ({
                headerTitle: getHeaderTitle(route),
              })}
            />
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
