import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { FontAwesome } from "@expo/vector-icons";
// import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import IconAnt from "react-native-vector-icons/AntDesign";
import { Button, TouchableOpacity } from "react-native";

import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import HomeScreen from "./src/screens/HomeScreen";
import WhiteScreen from "./src/screens/WhiteScreen";
import RecipeDetailsScreen from "./src/screens/RecipeDetailsScreen";
import AddRecipeScreen from "./src/screens/AddRecipeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import RecipeOverviewScreen from "./src/screens/RecipeOverviewScreen";
import EditScreen from "./src/screens/EditScreen";
import { hide } from "expo/build/launch/SplashScreen";
import { signoutThunk } from "./src/store/user/actions";

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
        options={{
          title: "Home",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={25} color="#95c6b1" />
          ),
        }}
      />
      <Tab.Screen
        title="Add recipe"
        name="Addrecipes"
        component={AddRecipeScreen}
        options={{
          title: "Add recipe",
          headerTitle: "Add recipe",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="plus-square" size={25} color="#95c6b1" />
          ),
        }}
      />
      <Tab.Screen
        title="Account"
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="user" size={25} color="#95c6b1" />
          ),
        }}
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

  function getHeaderRight(route) {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || "Home";

    switch (routeName) {
      case "Home":
        return null;
      case "Addrecipes":
        return null;
      case "Account":
        return (
          <TouchableOpacity onPress={() => dispatch(signoutThunk())}>
            <IconAnt
              style={{ marginRight: 15 }}
              name="logout"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        );
    }
  }

  // if (selectAppLoading) {
  //   return <WhiteScreen />;
  // }

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
                headerRight: () => getHeaderRight(route),
              })}
            />
            <Stack.Screen
              name="RecipeDetails"
              component={RecipeDetailsScreen}
              options={{ title: "Recipe" }}
            />
            <Stack.Screen
              options={{ title: "My recipes" }}
              name="RecipeOverview"
              component={RecipeOverviewScreen}
            />
            <Stack.Screen
              name="Edit"
              component={EditScreen}
              options={{ title: "Edit recipe" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// <Button
//           onPress={() => alert("This is a button!")}
//           title="Info"
//           color="#fff"
//         />
