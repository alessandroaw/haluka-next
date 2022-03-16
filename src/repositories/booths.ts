import api from "../utils/apiClient";
import axios, { AxiosError } from "axios";
import { Booth } from "src/types/models";

export const getUserBooths = async (): Promise<Booth[]> => {
  try {
    const res = await api.get<Booth[]>(`/users/booths`);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
