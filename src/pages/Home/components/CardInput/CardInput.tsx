import Card from "@components/atoms/Card/Card"
import clsx from "clsx";
import styles from './AnalizeCard.module.scss';
import type { UseMutationResult } from "@tanstack/react-query";
import type { AnalyzeSpamResult } from "@/api/spamService";
import type { AnalyzeSpamParams } from "@/hooks/api/useAnalyzeSpam";
import { useTranslation } from "react-i18next";
import Form from "@/components/organisms/form/Form";
import { BUTTON_PRESET } from "@/components/atoms/RadioBtn/presets/button.presets";
import SourceSwitcher from "@/components/organisms/SourceSwitcher/SourceSwitcher";
import { useToast } from "@/hooks/useToast";
import type { UseFormReset } from "react-hook-form";
import { parseEMLtoMailFormData } from "@/utils/mailParse";
import { VALIDATIONS_EMAIL } from "@/constants/validations";
import { buildSMTPString } from "@/utils/formatEmail";
import RadioBtn from "@/components/atoms/RadioBtn/RadioBtn";
import { useState } from "react";
import { type AvailableDomainsType } from "@/types/contentsFormDatas.types";
import type { IFormMail } from "@/pages/Insert/Insert.types";
import type { MarkRequired } from "@/types/utilities.types";
import { useOptions } from "@/hooks/useOptions";

interface CardInputProps {
  analyzeSpamMutation: UseMutationResult<AnalyzeSpamResult, Error, AnalyzeSpamParams, unknown>
}


export type IFormMailFinalType = MarkRequired<IFormMail, 'is_html'>


const CardInput = ({analyzeSpamMutation}: CardInputProps) => {
  const { t } = useTranslation(['common', 'home']);
  const [curType, setCurType] = useState<AvailableDomainsType>('mail')
  const { addToast } = useToast();

  const onFormMailSubmit = (obj: IFormMailFinalType) => {
    const text = buildSMTPString(obj)
    analyzeSpamMutation.mutate({ type: 'mail', text });
  };

  const onFormSMSSubmit = ({text}: {text: string}) => {
    analyzeSpamMutation.mutate({ type: 'sms', text });
  };

  const {domains} = useOptions();
  
  const insertCardClassName = clsx(
    "l-grid__col",
    {
      "l-grid__col--span-8": analyzeSpamMutation.isSuccess,
      "l-grid__col--span-12": !analyzeSpamMutation.isSuccess
    }
  );

  const handleText = (x: string, reset: UseFormReset<IFormMailFinalType>) => {
      reset(parseEMLtoMailFormData(x || ''));
  
      addToast(t('formMail.localToasts.addedFile'), 'success')
    }
  
    const handleFiles = async (files: FileList, reset: UseFormReset<IFormMailFinalType>) => {
      const file = files[0];
      if (!file) {
        addToast(t('formMail.localToasts.notFile'), 'failure')
        return;
      }
      
      const mailData = await file.text();
      handleText(mailData, reset)
    }

  return (
    <Card additionalClassName={insertCardClassName}>
      <RadioBtn
        name="type"
        options={domains}
        onValueChange={x => setCurType(x as AvailableDomainsType)}
        defaultValue={curType}
        {...BUTTON_PRESET}
      />

      {curType === 'mail' && (
        <Form<IFormMailFinalType>
          className={styles["c-card-input__form"]}
          onSubmit={onFormMailSubmit}
        >
          {({reset}) => (
            <div className="l-grid">
              <SourceSwitcher
                handleFiles={value => handleFiles(value, reset)}
                handleText={value => handleText(value, reset)}
                additionalClasses="l-grid__col l-grid__col--span-12"
              />
              
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="subject"
                label={t("home:cardInput.form.formMail.subject.label")}
                rules={{required: t("home:cardInput.form.formMail.subject.error.required")}}
              />

              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="from_name"
                label={t("home:cardInput.form.formMail.from_name.label")}
                rules={{
                  required: t("home:cardInput.form.formMail.from_name.error.required"),
                }}
              />

              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="from_mail"
                label={t("home:cardInput.form.formMail.from_mail.label")}
                rules={{
                  required: t("home:cardInput.form.formMail.from_mail.error.required"),
                  pattern: {
                    value: VALIDATIONS_EMAIL,
                    message: t("home:cardInput.form.formMail.from_mail.error.pattern.message"),
                  },
                }}
              />

              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="to"
                label={t("formMail.to.label")}
                rules={{
                  required: t("home:cardInput.form.formMail.to.error.required"),
                  pattern: {
                    value: VALIDATIONS_EMAIL,
                    message: t("home:cardInput.form.formMail.to.error.pattern.message"),
                  },
                }}
              />

              <Form.TextArea
                name="body_text"
                className={clsx(styles["c-card-input__text-area"], "l-grid__col l-grid__col--span-12")}
                label={t("home:cardInput.form.formMail.body_text.label")}
                rows={10}
                rules={{required: t("home:cardInput.form.formMail.body_text.error.required")}}
              />
              
              <Form.Switch
                allowIndeterminate
                additionalClassName="l-grid__col l-grid__col--span-12"
                name="is_html"
                label={t("home:cardInput.form.formMail.is_html.label")}
                rules={{validate: isHtml => isHtml !== null || t("home:cardInput.form.formMail.is_html.error.required")}}
              /> 
              
              <Form.Button
                type="submit"
                color="primary"
                autoDisabled={false}
                additionalClassName="l-grid__col l-grid__col--span-12"
              >
                {t('home:cardInput.form.formMail.submit.label')}
              </Form.Button>
            </div>
          )}
        </Form>
      )}

      {curType === 'sms' && (
        <Form
          className={styles["c-card-input"]}
          onSubmit={onFormSMSSubmit}
        >
          <div className="l-grid">
            <Form.TextArea
              name="text"
              className={clsx(styles["c-card-input__text-area"], "l-grid__col l-grid__col--span-12")}
              label={t('home:cardInput.form.textarea.placeholder')}
              rows={10}
              rules={{required: t('home:cardInput.form.formSMS.body_text.label')}}
            /> 
            <Form.Button
              type="submit"
              color="primary"
              additionalClassName="l-grid__col l-grid__col--span-12"
            >
              {t('home:cardInput.form.formSMS.submit.label')}
            </Form.Button>
          </div>
        </Form>
      )}
    </Card>
  )
}

export default CardInput;
