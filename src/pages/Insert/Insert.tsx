import Card from "@/components/atoms/Card/Card";
import styles from './Insert.module.scss';
import { useTranslation } from "react-i18next";
import RadioGroup from "@/components/atoms/RadioBtn/RadioBtn";
import { useState } from "react";
import FormSMS from "./components/FormSMS/FormSMS";
import { FormMail } from "./components/FormMail/FormMail";
import { BUTTON_PRESET } from "@/components/atoms/RadioBtn/presets/button.presets";
import type { AvailableDomains } from "@/types/contentsFormDatas.types";

const Insert = () => {
  const {t} = useTranslation()
  const domains = ['mail', 'sms'];
  const options = domains.map(value => (
    {label: t(`common:domains.types.${value}`), value}
  ))

  const [curForm, setCurForm] = useState<AvailableDomains | ''>('');

  return (
    <Card additionalClassName={styles['p-insert']}>
      <RadioGroup
        name="type"
        options={options}
        className="l-grid__col l-grid__col--span-10"
        onValueChange={(x) => {setCurForm(x as AvailableDomains)}}
        {...BUTTON_PRESET}
      />
      {curForm === 'mail' && <FormMail />}
      {curForm === 'sms' && <FormSMS /> }
    </Card>
  )
}

export default Insert;
