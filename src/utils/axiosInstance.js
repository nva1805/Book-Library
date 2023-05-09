import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://backend-booklibrary-default-rtdb.firebaseio.com/",
});

export default AxiosInstance;
