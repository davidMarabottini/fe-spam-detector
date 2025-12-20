import Button from "@components/atoms/Button/Button"
import Card from "@components/atoms/Card/Card"
import clsx from "clsx";
import styles from './AnalizeCard.module.scss';
import type { UseMutationResult } from "@tanstack/react-query";
import type { AnalyzeSpamResult } from "@/api/spamService";
import type { AnalyzeSpamParams } from "@/hooks/useAnalyzeSpam";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CardInputProps {
  analyzeSpamMutation: UseMutationResult<AnalyzeSpamResult, Error, AnalyzeSpamParams, unknown>
}

const CardInput = ({analyzeSpamMutation}: CardInputProps) => {
  const { t } = useTranslation(['common', 'home']);
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
      <h2>{t('home:cardInput.title')}</h2>
      
      <div className={clsx(styles["c-card-input__btn-group"])}>
        <Button 
          onClick={() => setValue('type', 'sms')} 
          color={selectedType === 'sms' ? 'primary' : 'secondary'} 
          rounded
        >{t('common:domains.types.sms')}</Button>
        <Button 
          onClick={() => setValue('type', 'mail')} 
          color={selectedType === 'mail' ? 'primary' : 'secondary'} 
          rounded
        >{t('common:domains.types.mail')}</Button>
      </div>
      
      <textarea
        {...register('text', { required: true })}
        className={styles["c-card-input__text-area"]}
        placeholder={t('home:cardInput.form.textarea.placeholder')}
        rows={10}
      ></textarea>
      
      <Button
        type="submit"
        color="primary"
        disabled={analyzeSpamMutation.isPending || !formState.isValid}
      >{t('home:cardInput.form.buttons.submit')}</Button>
      </form>
    </Card>
  )
}

export default CardInput;
