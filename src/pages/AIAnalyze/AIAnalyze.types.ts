import type { useAnalyzeSpam } from "@/hooks/api/useAnalyzeSpam";

export interface CardInputProps {
  analyzeSpamMutation:  ReturnType<typeof useAnalyzeSpam>;
}