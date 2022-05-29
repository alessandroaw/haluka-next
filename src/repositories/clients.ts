import axios, { AxiosError } from "axios";
import { Client } from "src/types/models";
import api from "src/utils/apiClient";

export const updateClient = async (
  newClient: Partial<Client>
): Promise<Client> => {
  try {
    const res = await api.patch<Client>(`clients`, newClient);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const getClientProfile = async (): Promise<Client> => {
  try {
    const res = await api.get<Client>(`clients/profile`);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
