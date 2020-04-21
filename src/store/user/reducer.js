const initialState = { token: null, categories: [] };

export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return { ...state, ...action.payload };
    case "signout":
      return { token: null };
    case "add_user_categories":
      return { ...state, categories: [...action.payload] };
    default:
      return state;
  }
};
