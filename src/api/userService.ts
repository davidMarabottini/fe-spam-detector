import type { RegistrationData } from "@/pages/Registration/Registration.types";
import apiClient from "../api/apiClient";

export interface RegistrationResult {
    status: "success" | "failure";
    "id": number,
    message: string
}

export const insertUser = async (
  registration: RegistrationData
): Promise<RegistrationResult> => {
  const {data} = await apiClient.post(
    '/api/users', registration
  )

  return data
}
