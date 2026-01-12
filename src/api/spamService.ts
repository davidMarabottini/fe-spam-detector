import type { AvailableDomainsType, AvailableOutcomesType } from "@/types/contentsFormDatas.types";
import apiClient from "../api/apiClient";

export interface AnalyzeSpamResult {
    "input_text": string,
    "model_used": AvailableDomainsType,
    "prediction": AvailableOutcomesType,
    "probability_spam": number,
    "status": string
}
export const predictSpam = async (
  type: AvailableDomainsType,
  text: string
): Promise<AnalyzeSpamResult> => {
  const { data } = await apiClient.post(
    `/predict/${type}`,
    { text },
    // { authRequired: true }
  );

  return data;
};
