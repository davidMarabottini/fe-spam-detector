import type { AvailableDomainsType, AvailableOutcomesType } from "@/types/contentsFormDatas.types";
import apiClient from "./apiClient";
import { MOCK_PATH } from "@/constants/api";

type ContentData = {
  userId: number,
  isSpam: AvailableOutcomesType,
  language: string,
  content: string,
  type: AvailableDomainsType
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

// export const mockMineContentError = async (): Promise<any> => {
//   const error = new Error('Server error');
//   error.code = '500';
//   throw error;
// }
