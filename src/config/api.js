import axios from "axios";

const recipeApi = axios.create({
  baseURL: "http://localhost:3000",
});

export default recipeApi;
