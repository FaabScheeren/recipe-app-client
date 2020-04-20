const initialState = { token: null };

export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return { ...state, ...action.payload };
    case "signout":
      return { token: null };
    default:
      return state;
  }
};
