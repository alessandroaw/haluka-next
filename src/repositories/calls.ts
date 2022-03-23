import axios, { AxiosError } from "axios";
import { Call } from "src/types/models";
import { CallFilterQuery } from "src/types/query";
import api from "../utils/apiClient";

export const fetchCall = async (query: CallFilterQuery): Promise<Call[]> => {
  try {
    const res = await api.get<Call[]>(`/calls`, { params: query });
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
