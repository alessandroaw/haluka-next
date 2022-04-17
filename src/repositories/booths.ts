import api from "../utils/apiClient";
import axios, { AxiosError } from "axios";
import { Booth, Bill } from "src/types/models";

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

export const getBoothBillsById = async (id: string): Promise<Bill[]> => {
  try {
    const res = await api.get<Bill[]>(`booths/${id}/bills`);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const getBoothsByUserId = async (id: string): Promise<Booth[]> => {
  try {
    const res = await api.get<Booth[]>(`users/${id}/booths`);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
