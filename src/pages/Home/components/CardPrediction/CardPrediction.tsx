import Card from "@components/atoms/Card/Card"
import clsx from "clsx";
// import styles from './AnalizeCar d.module.scss';
import type { UseMutationResult } from "@tanstack/react-query";
import type { AnalyzeSpamResult } from "@/api/spamService";
import type { AnalyzeSpamParams } from "@/hooks/useAnalyzeSpam";
import ResultCircle from "@/components/atoms/ResultCircle/ResultCircle";
import styles from "./CardPrediction.module.scss"

interface CardInputProps {
  analyzeSpamMutation: UseMutationResult<AnalyzeSpamResult, Error, AnalyzeSpamParams, unknown>
}

const CardResult = ({analyzeSpamMutation}: CardInputProps) => {
  const isSpam = analyzeSpamMutation.isSuccess && analyzeSpamMutation.data.prediction === 'spam';
  const predictionClass = clsx(
    styles["c-card-prediction__prediction-text"],
    {
        [styles["c-card-prediction__spam"]]: isSpam,
        [styles["c-card-prediction__legit"]]: !isSpam
    }
  )
  return (
    <Card additionalClassName="l-grid__col l-grid__col--span-6">
      <div className={styles["c-card-prediction__analysis-result"]}>
        <ResultCircle
        percentage={Number((analyzeSpamMutation.data!.probability_spam * 100).toFixed(2))}
        />
        <h2 className={predictionClass}>
          {analyzeSpamMutation.data!.prediction}
        </h2>
      </div>
    </Card>
  )
}

export default CardResult;
