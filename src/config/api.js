import axios from "axios";

const recipeApi = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://fathomless-journey-45254.herokuapp.com",
});

export default recipeApi;
