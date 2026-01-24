import Card from "@components/atoms/Card/Card"
import clsx from "clsx";
import ResultCircle from "@/components/atoms/ResultCircle/ResultCircle";
import styles from "./CardPrediction.module.scss"
import { calculatePerc } from "@/utils/numbers";
import Typography from "@/components/atoms/Typography/Typography";
import type { CardInputProps } from "../../AIAnalyze.types";


const CardResult = ({analyzeSpamMutation}: CardInputProps) => {
  const isSpam = analyzeSpamMutation.isSuccess && analyzeSpamMutation.data.prediction === 'spam';
  const predictionClass = clsx(
    styles["c-card-prediction__prediction-text"],
    {
        [styles["c-card-prediction__spam"]]: isSpam,
        [styles["c-card-prediction__legit"]]: !isSpam
    }
  )
  if(analyzeSpamMutation.data) {
    const {probability_spam, prediction} = analyzeSpamMutation.data;

    return (
      <Card additionalClassName="l-grid__col l-grid__col--span-4">
        <div className={styles["c-card-prediction__analysis-result"]}>
          <ResultCircle percentage={calculatePerc(probability_spam)} />
          <Typography
            variant="h2"
            additionalClasses={predictionClass}
          >
            {prediction}
          </Typography>
        </div>
      </Card>
    )
  }
  return <></>
}

export default CardResult;
