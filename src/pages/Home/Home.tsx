import clsx from "clsx";
import styles from "./Home.module.scss";
import {useAnalyzeSpam} from "@/hooks/api/useAnalyzeSpam";
import CardInput from "./components/CardInput/CardInput";
import CardResult from "./components/CardPrediction/CardPrediction";

const Home = () => {
  const analyzeSpamMutation = useAnalyzeSpam();
  return (
    <div className={clsx(styles["p-home"], "l-grid")}>
      <CardInput analyzeSpamMutation={analyzeSpamMutation} />
      
      {analyzeSpamMutation.isSuccess &&
        <CardResult analyzeSpamMutation={analyzeSpamMutation} />
      }
    </div>
  );
};

export default Home;
