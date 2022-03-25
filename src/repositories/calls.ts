import axios, { AxiosError } from "axios";
import { Call } from "src/types/models";
import { CallFilterParams } from "src/types/params";
import api from "../utils/apiClient";

export const fetchCall = async (params: CallFilterParams): Promise<Call[]> => {
  try {
    const res = await api.get<Call[]>(`/calls`, { params: params });
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
