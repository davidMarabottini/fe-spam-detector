import apiClient from "../api/apiClient";
import { MOCK_PATH } from "@/constants/api";

type MailData = {
  userId: number,
  isSpam: "spam" | "ham",
  language: string,
  mail: string
}

type MailResult = {
  code: number
  message: string
  insertedId: string
}

export const insertMineMail = async (payload: MailData): Promise<MailResult> => {
  const { data } = await apiClient.post('/mocks/inserted-mail.json', payload, {baseURL: MOCK_PATH});
  return data;
}
