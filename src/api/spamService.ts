import apiClient from "./apiClient";

export interface AnalyzeSpamResult {
    "input_text": string,
    "model_used": "sms" | "mail",
    "prediction": "ham" | "spam",
    "probability_spam": number,
    "status": string
}
export const predictSpam = async (
  type: 'sms' | 'mail',
  text: string
): Promise<AnalyzeSpamResult> => {
  const { data } = await apiClient.post(
    `/predict/${type}`,
    { text },
    // { authRequired: true }
  );

  return data;
};
