import axios from "axios";
import authToken from "src/modules/auth/authToken";

const authAxios = axios.create({
  // baseURL: "http://localhost:8085/api",
  baseURL: "https://www.manommano.com/api",
});


authAxios.interceptors.request.use(async function (options) {
  const token = authToken.get();
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }


  return options;
});

export default authAxios;

