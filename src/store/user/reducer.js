const initialState = { token: null };

export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return action.payload;
    default:
      return state;
  }
};
