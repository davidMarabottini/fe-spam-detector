import Form from "@components/organisms/form/Form"
import styles from "../../Insert.module.scss"
import clsx from "clsx"
import { ICON_PRESET } from "@components/atoms/RadioBtn/presets/icon.presets";
import { useTranslation } from "react-i18next";
import { spamOptions } from "../../constants";
import { LANGUAGES } from "@constants/languages";
import { VALIDATIONS_EMAIL } from "@constants/validations";
import DropZone from "@components/atoms/DropZone/DropZone";
import { parseEMLtoMailFormData } from "@utils/mailParse";
import { buildSMTPString } from "@utils/formatEmail";
import type { IFormFinalType } from "../../Insert.types";
import Typography from "@components/atoms/Typography/Typography";
import { useInsertMail } from "@hooks/useMineMailsHooks";
import { useMineDetails } from "@hooks/useAuthenticationHooks";
import { useToast } from "@/hooks/useToast";

export const FormMail = () => {
  const {mutate} = useInsertMail()
  const {classBase, ...iconPresetRest} = ICON_PRESET;
  const {t} = useTranslation(["insert"])
  const { data: mineDetails } = useMineDetails();
  const { addToast } = useToast();

  const {id: userId} = mineDetails || {id: undefined};

  const handleFiles = async (files: FileList, reset: (x: object) => void) => {
    const file = files[0];
    if (!file) {
      addToast(t('formMail.localToasts.notFile'), 'failure')
      return;
    }
    
    const mailData = await file.text();
    addToast(t('formMail.localToasts.addedFile'), 'success')
    reset({
      ...parseEMLtoMailFormData(mailData),
      language: "",
      isSpam: null,
    });
  }
  return (
    <div>
      <Form<IFormFinalType>
        className={styles["p-insert__form"]}
        onSubmit={
          ({language, isSpam, ...rest}, {reset}) => {
            if(userId){
              const mail = buildSMTPString(rest as IFormFinalType)
              mutate({ userId, language, isSpam, mail })

              reset({
                language: "",
                isSpam: null,
                subject: "",
                from_name: "",
                from_mail: "",
                to: "",
                body_text: "",
              })
              
            }
          }
        }
      >
        {({reset}) => {
          return (
            <>
              <div className="l-grid">
                <DropZone
                  label={t('formMail.dropArea.label')}
                  handleFiles={value => handleFiles(value, reset)}
                  additionalClasses="l-grid__col l-grid__col--span-12"
                />
                <Typography as="div" additionalClasses="l-grid__col l-grid__col--span-12">{t('formMail.labelInsert')}</Typography>
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
                  options={spamOptions}
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
            </>
        )}}
      </Form>
    </div>
  )
}
