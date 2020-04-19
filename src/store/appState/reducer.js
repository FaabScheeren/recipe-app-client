const initialState = {
  appLoading: false,
};

export default appStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AppLoading":
      return { ...state, appLoading: true };
    case "appDoneLoading":
      return { ...state, appLoading: false };
    default:
      return state;
  }
};
