// import React from "react";
// import { useSelector } from "react-redux";
// import { Provider } from "react-redux";
// import store from "./src/store";
// import ErrorBoundary from "./ErrorBoundary";

// import {
//   NavigationContainer,
//   createSwitchNavigator,
// } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomNavigator } from "@react-navigation/bottom-tabs";

// import SignupScreen from "./src/screens/SignupScreen";
// import SigninScreen from "./src/screens/SigninScreen";
// import HomeScreen from "./src/screens/HomeScreen";
// import { hide } from "expo/build/launch/SplashScreen";

// import { selectToken } from "./src/store/user/selector";

// const Stack = createStackNavigator();

// export default function App() {
//   const token = useSelector(selectToken);
//   // console.log("TOKEN IN APP.JS", token);
//   console.log("state", state);

//   return (
//     <ErrorBoundary>
//       <Provider store={store}>
//         <NavigationContainer>
//           <Stack.Navigator
//             initialRouteName="Signup"
//             screenOptions={{
//               headerStyle: {
//                 backgroundColor: "#f4511e",
//               },
//               headerTintColor: "#fff",
//               headerTitleAlign: "center",
//             }}
//           >
//             {false ? (
//               <>
//                 <Stack.Screen
//                   name="Signup"
//                   component={SignupScreen}
//                   options={{
//                     title: "Welcome!",
//                   }}
//                 />
//                 <Stack.Screen
//                   name="Login"
//                   component={SigninScreen}
//                   options={{
//                     title: "Welcome!",
//                     headerBackTitleVisible: false,
//                     headerBackImage: hide,
//                   }}
//                 />
//               </>
//             ) : (
//               <>
//                 <Stack.Screen name="Home" component={HomeScreen} />
//               </>
//             )}
//           </Stack.Navigator>
//         </NavigationContainer>
//       </Provider>
//     </ErrorBoundary>
//   );
// }

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./src/store";
import ErrorBoundary from "./ErrorBoundary";
import Navigation from "./Navigation";

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ErrorBoundary>
  );
}
