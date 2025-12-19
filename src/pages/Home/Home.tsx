import clsx from "clsx";
// import Card from "@components/atoms/Card/Card";
// import ResultCircle from "@components/atoms/ResultCircle/ResultCircle";
import styles from "./Home.module.scss";
import {useAnalyzeSpam} from "@hooks/useAnalyzeSpam";
import CardInput from "./components/CardInput/CardInput";
import CardResult from "./components/CardPrediction/CardPrediction";

const Home = () => {
  const analyzeSpamMutation = useAnalyzeSpam();

  return (
    <div className={clsx(styles["c-home"], "l-grid")}>
      <CardInput analyzeSpamMutation={analyzeSpamMutation} />
      
      {analyzeSpamMutation.isSuccess &&
        <CardResult analyzeSpamMutation={analyzeSpamMutation} />
      }
    </div>
  );
};

export default Home;
