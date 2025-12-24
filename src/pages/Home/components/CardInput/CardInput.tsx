import Button from "@components/atoms/Button/Button"
import Card from "@components/atoms/Card/Card"
import clsx from "clsx";
import styles from './AnalizeCard.module.scss';
import type { UseMutationResult } from "@tanstack/react-query";
import type { AnalyzeSpamResult } from "@/api/spamService";
import type { AnalyzeSpamParams } from "@/hooks/useAnalyzeSpam";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TextArea from "@/components/atoms/TextArea/TextArea";
import RadioGroup from "@/components/atoms/RadioBtn/RadioBtn";

interface CardInputProps {
  analyzeSpamMutation: UseMutationResult<AnalyzeSpamResult, Error, AnalyzeSpamParams, unknown>
}

const CardInput = ({analyzeSpamMutation}: CardInputProps) => {
  const { t } = useTranslation(['common', 'home']);
  const { register, handleSubmit, setValue, formState } = useForm<AnalyzeSpamParams>({
    defaultValues: {
      type: 'sms',
      text: ''
    }
  });
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
        
        <RadioGroup variant="ghost" defaultValue="sms" gap="sm" options={[{label: 'common:domains.types.sms', value: 'sms'}, {label: 'common:domains.types.mail', value: 'mail'}]} >
          {({label, value}, isSelected) => (
            <Button 
              onClick={() => setValue('type', value as 'mail' | 'sms')} 
              color={isSelected ? 'primary' : 'secondary'} 
              rounded
              asChild
            >
              <div>
                {t(label)}
              </div>
            </Button>
            )}
        </RadioGroup>
        
        <TextArea
          {...register('text', { required: true })}
          className={styles["c-card-input__text-area"]}
          label={t('home:cardInput.form.textarea.placeholder')}
          rows={10}
        />
        
        <Button
          type="submit"
          color="primary"
          disabled={analyzeSpamMutation.isPending || !formState.isValid}
        >
          {t('home:cardInput.form.buttons.submit')}
        </Button>
      </form>
    </Card>
  )
}

export default CardInput;
