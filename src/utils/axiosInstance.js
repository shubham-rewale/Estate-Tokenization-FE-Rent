import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://estate-tokenization-be-0ljo.onrender.com/",
});

export default AxiosInstance;
