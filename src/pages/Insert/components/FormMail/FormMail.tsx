import Form from "@components/organisms/form/Form"
import styles from "../../Insert.module.scss"
import clsx from "clsx"
import { ICON_PRESET } from "@components/atoms/RadioBtn/presets/icon.presets";
import { useTranslation } from "react-i18next";
import { initialValues } from "../../constants";
import { LANGUAGES } from "@constants/languages";
import { VALIDATIONS_EMAIL } from "@constants/validations";
import { parseEMLtoMailFormData } from "@utils/mailParse";
import { buildSMTPString } from "@utils/formatEmail";
import type { IFormMailFinalType } from "../../Insert.types";
import Typography from "@components/atoms/Typography/Typography";
import { useInsertContent } from "@/hooks/api/useMineContentsHoks";
import { useMineDetails } from "@/hooks/api/useAuthenticationHooks";
import { useToast } from "@/hooks/useToast";
import SourceSwitcher from "@/components/organisms/SourceSwitcher/SourceSwitcher";
import type { UseFormReset, UseFormReturn } from "react-hook-form";
import { useOptions } from "@/hooks/useOptions";

export const FormMail = () => {
  const {mutate} = useInsertContent('mail')
  const {classBase, ...iconPresetRest} = ICON_PRESET;
  const {t} = useTranslation(["insert"])
  const { data: mineDetails } = useMineDetails();
  const { addToast } = useToast();

  const {id: userId} = mineDetails || {id: undefined};

  const submitHandler = (
    {language, isSpam, ...rest}: IFormMailFinalType,
    {reset}:UseFormReturn<IFormMailFinalType>
  ) => {
    if(userId){
      const mail = buildSMTPString(rest as IFormMailFinalType)
      mutate({ userId, language, isSpam, content: mail, type: 'mail' })
      reset(initialValues)
    }
  }

  const handleText = (text: string, reset: UseFormReset<IFormMailFinalType>) => {
    reset({
      ...parseEMLtoMailFormData(text),
      language: "",
      isSpam: null,
    } as IFormMailFinalType);

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

  const {outcomes} = useOptions()

  return (
    <div>
      <Form<IFormMailFinalType>
        className={styles["p-insert__form"]}
        onSubmit={submitHandler}
      >
        {({reset}) => {
          return (
            <div className="l-grid">
              <SourceSwitcher
                handleFiles={value => handleFiles(value, reset)}
                handleText={value => handleText(value, reset)}
                additionalClasses="l-grid__col l-grid__col--span-12"
              />

              <Typography
                as="div"
                additionalClasses="l-grid__col l-grid__col--span-12"
              >
                {t('formMail.labelInsert')}
              </Typography>
              
              <Form.Select
                name="language"
                label={t("formMail.language.label")}
                options={LANGUAGES}
                className="l-grid__col l-grid__col--span-10"
                rules={{required: t("formMail.language.error.required")}}
              />

              <Form.RadioBtn
                name="isSpam"
                className ={clsx(classBase, "l-grid__col l-grid__col--span-2")}
                rules={{ required: t('formMail.isSpam.error.required') }}
                gap="lg"
                options={outcomes}
                {...iconPresetRest}
              />

              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="subject"
                label={t("formMail.subject.label")}
                rules={{required: t("formMail.subject.error.required")}}
              />

              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="from_name"
                label={t("formMail.from_name.label")}
                rules={{
                  required: t("formMail.from_name.error.required"),
                }}
              />

              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="from_mail"
                label={t("formMail.from_mail.label")}
                rules={{
                  required: t("formMail.from_mail.error.required"),
                  pattern: {
                    value: VALIDATIONS_EMAIL,
                    message: t("formMail.from_mail.error.pattern.message"),
                  },
                }}
              />

              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="to"
                label={t("formMail.to.label")}
                rules={{
                  required: t("formMail.to.error.required"),
                  pattern: {
                    value: VALIDATIONS_EMAIL,
                    message: t("formMail.to.error.pattern.message"),
                  },
                }}
              />

              <Form.TextArea
                name="body_text"
                className={clsx(styles["c-card-input__text-area"], "l-grid__col l-grid__col--span-12")}
                label={t("formMail.body_text.label")}
                rows={10}
                rules={{required: t("formMail.body_text.error.required")}}
              />
              
              <Form.Switch
                allowIndeterminate
                additionalClassName="l-grid__col l-grid__col--span-12"
                name="is_html"
                label={t("formMail.is_html.label")}
                rules={{validate: isHtml => isHtml !== null || t("formMail.is_html.error.required")}}
              /> 
              
              <Form.Button
                type="submit"
                color="primary"
                additionalClassName="l-grid__col l-grid__col--span-12"
                autoDisabled={false}
                disabled={userId === undefined}
              >
                {t('formMail.submit.label')}
              </Form.Button>
            </div>
          )
        }}
      </Form>
    </div>
  )
}
