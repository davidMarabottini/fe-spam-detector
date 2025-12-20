import Button from "@components/atoms/Button/Button"
import Card from "@components/atoms/Card/Card"
import clsx from "clsx";
import styles from './AnalizeCard.module.scss';
import type { UseMutationResult } from "@tanstack/react-query";
import type { AnalyzeSpamResult } from "@/api/spamService";
import type { AnalyzeSpamParams } from "@/hooks/useAnalyzeSpam";
import { useForm } from "react-hook-form";

interface CardInputProps {
  analyzeSpamMutation: UseMutationResult<AnalyzeSpamResult, Error, AnalyzeSpamParams, unknown>
}

const CardInput = ({analyzeSpamMutation}: CardInputProps) => {
  const { register, handleSubmit, setValue, watch, formState } = useForm<AnalyzeSpamParams>({
    defaultValues: {
      type: 'sms',
      text: ''
    }
  });

  const selectedType = watch('type');

  const onFormSubmit = ({type, text}: AnalyzeSpamParams) => {
    analyzeSpamMutation.mutate({ type, text });
  }
  
  const insertCardClassName = clsx(
    "l-grid__col",
    {
      "l-grid__col--span-6": analyzeSpamMutation.isSuccess,
      "l-grid__col--span-12": !analyzeSpamMutation.isSuccess
    }
  )

  return (
    <Card additionalClassName={insertCardClassName}>
      <form className={styles["c-card-input"]} onSubmit={handleSubmit(onFormSubmit)}>
      <h2>Inserisci il testo del messaggio</h2>
      
      <div className={clsx(styles["c-card-input__btn-group"])}>
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
        className={styles["c-card-input__text-area"]}
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
  )
}

export default CardInput;
