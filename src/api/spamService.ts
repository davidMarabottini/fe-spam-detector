import type { AvailableDomains, AvailableOutcomes } from "@/types/contentsFormDatas.types";
import apiClient from "../api/apiClient";

export interface AnalyzeSpamResult {
    "input_text": string,
    "model_used": AvailableDomains,
    "prediction": AvailableOutcomes,
    "probability_spam": number,
    "status": string
}
export const predictSpam = async (
  type: AvailableDomains,
  text: string
): Promise<AnalyzeSpamResult> => {
  const { data } = await apiClient.post(
    `/predict/${type}`,
    { text },
    // { authRequired: true }
  );

  return data;
};
