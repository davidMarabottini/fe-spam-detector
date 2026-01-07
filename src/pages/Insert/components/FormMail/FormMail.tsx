import Form from "@components/organisms/form/Form"
import styles from "../../Insert.module.scss"
import clsx from "clsx"
import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";
import { useTranslation } from "react-i18next";
import { spamOptions } from "../../constants";
import { LANGUAGES } from "@/constants/languages";
import { VALIDATIONS_EMAIL } from "@/constants/validations";

export const FormMail = () => {
    const {classBase, ...iconPresetRest} = ICON_PRESET;
    const {t} = useTranslation(["insert"])
  return (
    <Form
      className={styles["p-insert__form"]}
      onSubmit={console.log}
    >
      <div className="l-grid">
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
          name="from_header"
          label={t("formMail.from_header.label")}
          rules={{
            required: t("formMail.from_header.error.required"),
            pattern: {
              value: VALIDATIONS_EMAIL,
              message: t("formMail.from_header.error.pattern.message"),
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
          rules={{required: t("formMail.is_html.error.required")}}
        /> 
        <Form.Button
          type="submit"
          color="primary"
          additionalClassName="l-grid__col l-grid__col--span-12"
          autoDisabled={false}
        >
          {t('formMail.submit.label')}
        </Form.Button>
      </div>
    </Form>
  )
}
