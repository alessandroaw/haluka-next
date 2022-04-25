import axios, { AxiosError } from "axios";
import { User } from "src/types/models";
import api from "src/utils/apiClient";

export const updateUser = async (
  id: string,
  name: string,
  password?: string
): Promise<User> => {
  const payload = { name, password };

  if (!Boolean(password) || password === "") {
    delete payload.password;
  }

  try {
    const res = await api.patch<User>(`users/${id}`, payload);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
