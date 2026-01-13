import clsx from "clsx";
import styles from "./AIAnalyze.module.scss";
import {useAnalyzeSpam} from "@/hooks/api/useAnalyzeSpam";
import CardInput from "./components/CardInput/CardInput";
import CardResult from "./components/CardPrediction/CardPrediction";

const AIAnalyze = () => {
  const analyzeSpamMutation = useAnalyzeSpam();
  return (
    <div className={clsx(styles["p-analyze"], "l-grid")}>
      <CardInput analyzeSpamMutation={analyzeSpamMutation} />
      
      {analyzeSpamMutation.isSuccess &&
        <CardResult analyzeSpamMutation={analyzeSpamMutation} />
      }
    </div>
  );
};

export default AIAnalyze;
