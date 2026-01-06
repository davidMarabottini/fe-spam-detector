import Card from "@/components/atoms/Card/Card";
import styles from './Insert.module.scss';
import Form from "@/components/organisms/form/Form";
import Button from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { ShieldBan, ShieldCheck } from "lucide-react";
import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";

const Insert = () => {
  const domains = ['mail', 'sms'];
  const options = domains.map(value => (
    {label: `common:domains.types.${value}`, value}
  ))

  const {t} = useTranslation()
  
  const spamOptions = [
    {label: t('SPAM'), Icon: ShieldBan, value: 'spam'},
    {label: t('HAM'), Icon: ShieldCheck, value: 'ham'},
  ]

  return (
    <Card additionalClassName={styles['p-insert']}>
      <Form
        className={styles["c-card-input"]}
        onSubmit={console.log}
      >
        {({watch, getValues}) => {
          const selectedType = watch('type');
          // const isSpam = watch('is_spam');
          const {classBase, ...iconPresetRest} = ICON_PRESET;
          console.log(getValues())
          return (
            <div className="l-grid">
              <Form.RadioBtn
                name="type"
                variant="ghost"
                gap="sm"
                options={options}
                className="l-grid__col l-grid__col--span-10"
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

              {selectedType &&
              <Form.RadioBtn
                name="isSpam"
                className ={clsx(classBase, "l-grid__col l-grid__col--span-2")}
                rules={{ required: t('form.gender.error.required') }}
                gap="lg"
                options={spamOptions}
                // disabled={formDisabled}
                {...iconPresetRest}
              />
              }
              {selectedType === domains[0] && (
                <>
                  <Form.Input
                    className="l-grid__col l-grid__col--span-6"
                    name="subject"
                    label="subject"
                  />
                  <Form.Input
                    className="l-grid__col l-grid__col--span-6"
                    name="from_header"
                    label="from_header"
                  />
                  <Form.Input
                    className="l-grid__col l-grid__col--span-6"
                    name="content_type"
                    label="content_type"
                  />
                  <Form.TextArea
                    name="body_text"
                    className={clsx(styles["c-card-input__text-area"], "l-grid__col l-grid__col--span-12")}
                    label={t('home:cardInput.form.textarea.placeholder')}
                    rows={10}
                    rules={{required: t('text.required')}}
                  />
                  <Form.Switch
                    allowIndeterminate
                    additionalClassName="l-grid__col l-grid__col--span-12"
                    name="is_html"
                    label="HTML"
                  /> 
              </>)}
              
              {selectedType === domains[1] &&
                <Form.TextArea
                  name="text"
                  className={clsx(styles["c-card-input__text-area"], "l-grid__col l-grid__col--span-12")}
                  label={t('home:cardInput.form.textarea.placeholder')}
                  rows={10}
                  rules={{required: t('text.required')}}
                />
              }
              
              {selectedType && <Form.Button
                type="submit"
                color="primary"
                additionalClassName="l-grid__col l-grid__col--span-12"
              >
                {t('home:cardInput.form.buttons.submit')}
              </Form.Button>}
            </div>
          )
        }}
      </Form>
    </Card>
  )
}

export default Insert;
