import axios from "axios";
import { IUser } from "../types/user";
import { Routes } from "../config/routes";

export const getToken = () => localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

export const getAuth = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getToken() || ""}` },
  };
  const { data } = await axios.get(Routes.auth, config);

  return data;
};

export const login = async (data: IUser): Promise<any> => {
  const { data: userData } = await axios.post(Routes.login, data);
  return userData;
};

export const registration = async (data: IUser): Promise<any> => {
  const { data: userData } = await axios.post(Routes.registration, data);
  return userData;
};
