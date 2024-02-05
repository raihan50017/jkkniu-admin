import axios from "axios";

const instance = axios.create({
  baseURL: "http://103.28.121.117:3001",
  timeout: 10000,
});

export default instance;
