import apiClient from "./apiClient";
import type { UserProfile } from "@/auth/types";

export const login = async (credentials: {username: string, password: string}): Promise<{ user: UserProfile }> => {
  const { data } = await apiClient.post('/login', credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/logout');
};

export const getMe = async (): Promise<{ user: UserProfile }> => {
  const { data } = await apiClient.get('/api/me');
  return data;
};

export const getMineDetails = async (): Promise<object> => {
  const { data } = await apiClient.get('/api/users/me');
  return data;
};