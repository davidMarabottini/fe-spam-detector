import Button from "@components/atoms/Button/Button"
import Card from "@components/atoms/Card/Card"
import clsx from "clsx";
import styles from './AnalizeCard.module.scss';
import type { UseMutationResult } from "@tanstack/react-query";
import type { AnalyzeSpamResult } from "@/api/spamService";
import type { AnalyzeSpamParams } from "@/hooks/useAnalyzeSpam";
import { useTranslation } from "react-i18next";
import Form from "@/components/organisms/form/Form";
import Stack from "@/components/atoms/Stack/Stack";
import Typography from "@/components/atoms/Typography/Typography";

interface CardInputProps {
  analyzeSpamMutation: UseMutationResult<AnalyzeSpamResult, Error, AnalyzeSpamParams, unknown>
}

const CardInput = ({analyzeSpamMutation}: CardInputProps) => {
  const { t } = useTranslation(['common', 'home']);
  const onFormSubmit = ({type, text}: AnalyzeSpamParams) => {
    analyzeSpamMutation.mutate({ type, text });
  };
  const domains = ['mail', 'sms'];

  const options = domains.map(value => ({label: `common:domains.types.${value}`, value}))
  
  const insertCardClassName = clsx(
    "l-grid__col",
    {
      "l-grid__col--span-6": analyzeSpamMutation.isSuccess,
      "l-grid__col--span-12": !analyzeSpamMutation.isSuccess
    }
  );

  return (
    <Card additionalClassName={insertCardClassName}>
      <Form
        className={styles["c-card-input"]}
        onSubmit={onFormSubmit}
      >
        <Stack spacing="md">
          <Typography variant="h2">{t('home:cardInput.title')}</Typography>
          <Form.RadioBtn
            name="type"
            variant="ghost"
            gap="sm"
            options={options}
            rules={{required: t('mailtype.required')}}
          >
            {({label}, isSelected) => (
              <Button 
                color={isSelected ? 'primary' : 'secondary'} 
                rounded
                asChild
              >
                <div> {t(label)} </div>
              </Button>
              )}
          </Form.RadioBtn>
          
          <Form.TextArea
            name="text"
            className={styles["c-card-input__text-area"]}
            label={t('home:cardInput.form.textarea.placeholder')}
            rows={10}
            rules={{required: t('text.required')}}
          />
          
          <Form.Button
            type="submit"
            color="primary"
          >
            {t('home:cardInput.form.buttons.submit')}
          </Form.Button>
        </Stack>
      </Form>
    </Card>
  )
}

export default CardInput;
