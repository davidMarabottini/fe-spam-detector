import clsx from "clsx";
import Card from "@components/Card/Card";
import Button from "@components/Button/Button";
import ResultCircle from "@components/ResultCircle/ResultCircle";
import styles from "./Home.module.scss";
import {useAnalyzeSpam} from "@hooks/useAnalyzeSpam";
import type { AnalyzeSpamParams } from "@hooks/useAnalyzeSpam";
import { useForm } from "react-hook-form";

const Home = () => {
  const analyzeSpamMutation = useAnalyzeSpam();
  
  const { register, handleSubmit, setValue, watch, formState } = useForm<AnalyzeSpamParams>({
    defaultValues: {
      type: 'sms',
      text: ''
    }
  });

  const isSpam = analyzeSpamMutation.isSuccess && analyzeSpamMutation.data.prediction === 'spam';

  const selectedType = watch('type');
  
  const onFormSubmit = ({type, text}: AnalyzeSpamParams) => {
    analyzeSpamMutation.mutate({ type, text });
  }

  const insertCardClassName = clsx("l-grid__col", {"l-grid__col--span-6": analyzeSpamMutation.isSuccess, "l-grid__col--span-12": !analyzeSpamMutation.isSuccess})

  return (
    <div className={clsx(styles["c-home"], "l-grid")}>
      <Card additionalClassName={insertCardClassName}>
        <form className={styles["c-home__insert-section"]} onSubmit={handleSubmit(onFormSubmit)}>
        <h2>Inserisci il testo del messaggio</h2>
        
        <div className={clsx(styles["c-home__btn-group"])}>
          <Button 
            onClick={() => setValue('type', 'sms')} 
            color={selectedType === 'sms' ? 'primary' : 'secondary'} 
            rounded
          >SMS</Button>
          <Button 
            onClick={() => setValue('type', 'mail')} 
            color={selectedType === 'mail' ? 'primary' : 'secondary'} 
            rounded
          >Email</Button>
        </div>
        
        <textarea
          {...register('text', { required: true })}
          className={styles["c-home__text-area"]}
          placeholder="Inserisci qui il testo del messaggio..."
          rows={10}
        ></textarea>
        
        <Button
          type="submit"
          color="primary"
          disabled={analyzeSpamMutation.isPending || !formState.isValid}
        >Analizza Messaggio</Button>
        </form>
      </Card>
      {analyzeSpamMutation.isSuccess &&
        <Card additionalClassName="l-grid__col l-grid__col--span-6">
          <div className={styles["c-home__analysis-result"]}>
            <ResultCircle
              percentage={Number((analyzeSpamMutation.data.probability_spam * 100).toFixed(2))}
            />
            <h2 className={clsx(
              styles["c-home__prediction-text"],
              {
                [styles["c-home__prediction-text--spam"]]: isSpam,
                [styles["c-home__prediction-text--legit"]]: !isSpam
              }
            )}>
              {analyzeSpamMutation.data.prediction}
            </h2>
          </div>
        </Card>
      }
    </div>
  );
};

export default Home;
