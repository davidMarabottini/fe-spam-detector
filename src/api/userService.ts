import type { RegistrationData } from "@/pages/Registration/Registration.types";
import apiClient from "../api/apiClient";
import { MOCK_PATH } from "@/constants/api";

export interface RegistrationResult {
    status: "success" | "failure";
    "id": number,
    message: string
}

export interface UserStatusResult {
  user: {
    level: number
    nextLevelProgress: number
    rank: string
  }
  contributions: {
    mail: {
      ham: number
      spam: number
    }
    sms: {
      ham: number
      spam: number
    }
  }
  privileges: string[]
  badges: {
    id: number
    name: string
    iconName: string
  }[]
}


export const insertUser = async (
  registration: RegistrationData
): Promise<RegistrationResult> => {
  const {data} = await apiClient.post(
    '/api/users', registration
  )

  return data
}

export const getUserStatus = async (): Promise<UserStatusResult> => {
  const { data } = await apiClient.get('/mocks/user-status.json', {baseURL: MOCK_PATH});
  return data;
};