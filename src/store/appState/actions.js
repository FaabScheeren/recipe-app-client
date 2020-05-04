export const appLoading = () => {
  return {
    type: "AppLoading",
  };
};

export const appDoneLoading = () => {
  return {
    type: "appDoneLoading",
  };
};

export const setMessage = (text) => {
  return {
    type: "setMessage",
    payload: text,
  };
};

export const clearMessage = () => ({ type: "clearMessage" });
