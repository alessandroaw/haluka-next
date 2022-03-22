import axios, { AxiosError } from "axios";
import { Bill } from "src/types/models";
import api from "../utils/apiClient";

export const payBill = async (billIds: string[]): Promise<Bill[]> => {
  try {
    const res = await api.patch<Bill[]>(`/bills/payment`, {
      billIds,
    });
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
