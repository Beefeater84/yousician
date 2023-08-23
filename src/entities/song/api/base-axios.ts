import axios from "axios";
import { SERVER_BASE_URL } from "@/application/constants/constants";

export const instance = axios.create({
  baseURL: SERVER_BASE_URL,
});
