import axios from "axios";
import authToken from "src/modules/auth/authToken";

const authAxios = axios.create({
  // baseURL: "https://www.disruptiveadvertisng.com/api",
  baseURL: "http://localhost:8082/api",
});


authAxios.interceptors.request.use(async function (options) {
  const token = authToken.get();
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  return options;
});

export default authAxios;
