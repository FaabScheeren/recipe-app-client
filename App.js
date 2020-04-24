import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import ErrorBoundary from "./ErrorBoundary";
import Navigation from "./Navigation";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    poppins: require("./assets/fonts/Poppins-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    montserrat: require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-semi": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ErrorBoundary>
  );
}
