import axios from "axios";

const instance = axios.create({
  baseURL: "http://103.28.121.117:3001",
});

export default instance;
