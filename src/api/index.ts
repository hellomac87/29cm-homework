import axios from "axios";

const baseURL = "";

const apiClient = axios.create({
  baseURL,
});

export default apiClient;
