import { ICON_PRESET } from "@components/atoms/RadioBtn/presets/icon.presets";
import Form from "@components/organisms/form/Form"
import { LANGUAGES } from "@constants/languages"
import clsx from "clsx"
import styles from "../../Insert.module.scss"
import { useTranslation } from "react-i18next";
import { spamOptions } from "../../constants";
import type { IFormSMSFinalType } from "../../Insert.types";
import type { FormProperties } from "@/components/organisms/form/Form.types";
import { useMineDetails } from "@/hooks/useAuthenticationHooks";
import { useInsertContent } from "@/hooks/useMineContentsHoks";

const FormSMS = () => {
  const {mutate} = useInsertContent('sms')
  const {classBase, ...iconPresetRest} = ICON_PRESET;
  const {t} = useTranslation(["insert"])
  const { data: mineDetails } = useMineDetails();

  const {id: userId} = mineDetails || {id: undefined};

  const initialValues = {
    language: "",
    isSpam: null,
    text: "",
  }

  const submitHandler = (
      {language, isSpam, text: sms}: IFormSMSFinalType,
      {reset}:FormProperties<IFormSMSFinalType>
    ) => {
      if(userId){
        mutate({ userId, language, isSpam, content: sms, type: 'sms' })
        reset(initialValues)
      }
    }

  return (
    <Form
      className={styles["p-insert__form"]}
      onSubmit={submitHandler}
    >
      <div className="l-grid">
        <Form.Select
          name="language"
          label={t("formSMS.language.label")}
          options={LANGUAGES}
          className="l-grid__col l-grid__col--span-10"
          rules={{required: t('formSMS.language.error.required')}}
        />
        <Form.RadioBtn
          name="isSpam"
          className ={clsx(classBase, "l-grid__col l-grid__col--span-2")}
          rules={{ required: t('formSMS.isSpam.error.required') }}
          gap="lg"
          options={spamOptions}
          {...iconPresetRest}
        />

        <Form.TextArea
          name="text"
          className={clsx(styles["c-card-input__text-area"], "l-grid__col l-grid__col--span-12")}
          label={t("formSMS.body_text.label")}
          rows={10}
          rules={{required: t("formSMS.body_text.error.required")}}
        />

        <Form.Button
          type="submit"
          color="primary"
          additionalClassName="l-grid__col l-grid__col--span-12"
          autoDisabled={false}
        >
          {t('formSMS.submit.label')}
        </Form.Button>
      </div>
    </Form>
  )
}

export default FormSMS;
