import type { AvailableDomains, AvailableOutcomes } from "@/types/contentsFormDatas.types";
import apiClient from "./apiClient";
import { MOCK_PATH } from "@/constants/api";

type ContentData = {
  userId: number,
  isSpam: AvailableOutcomes,
  language: string,
  content: string,
  type: AvailableDomains
}

type ContentResult = {
  code: number
  message: string
  insertedId: string
}

export const insertMineContent = async (payload: ContentData): Promise<ContentResult> => {
  const { data } = await apiClient.post('/mocks/inserted-mail.json', payload, {baseURL: MOCK_PATH});
  return data;
}
