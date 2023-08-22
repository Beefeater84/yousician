import axios from "axios";
import { SERVER_BASE_URL } from "@/application/constants/constants";

const instance = axios.create({
  baseURL: SERVER_BASE_URL,
});

const getSongs = async (url: string, parameters?: object) => {
  const response = await instance.get(url, {
    params: parameters,
  });

  return response.data;
};

export default getSongs;
