const initialState = {
  appLoading: false,
  message: null,
};

export default appStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AppLoading":
      return { ...state, appLoading: true };

    case "appDoneLoading":
      return { ...state, appLoading: false };

    case "setMessage":
      return { ...state, message: action.payload };

    case "clearMessage":
      return { ...state, message: null };

    default:
      return state;
  }
};
