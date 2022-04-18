import axios, { AxiosError } from "axios";
import { User } from "src/types/models";
import api from "../utils/apiClient";

/// Users API colection
export const fetchUsersByClientName = async (
  clientName: string
): Promise<User[]> => {
  try {
    const res = await api.get<User[]>(`clients/${clientName}/users`);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchUserList = async (): Promise<User[]> => {
  try {
    const res = await api.get<User[]>(`clients/users`);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const login = async (id: string, password: string): Promise<User> => {
  try {
    const res = await api.post<User>(`users/wartel-login`, { id, password });
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    const res = await api.get(`users/logout`);
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const getUserProfile = async (): Promise<User> => {
  try {
    const res = await api.get<User>(`users/profile`);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
