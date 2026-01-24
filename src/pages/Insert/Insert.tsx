import Card from "@/components/atoms/Card/Card";
import styles from './Insert.module.scss';
import RadioBtn from "@/components/atoms/RadioBtn/RadioBtn";
import { useState } from "react";
import FormSMS from "./components/FormSMS/FormSMS";
import { FormMail } from "./components/FormMail/FormMail";
import { BUTTON_PRESET } from "@/components/atoms/RadioBtn/presets/button.presets";
import type { AvailableDomainsType } from "@/types/contentsFormDatas.types";
import { useDomain } from "@/hooks/api/useDomainHooks";

const Insert = () => {
  const { data, isLoading } = useDomain();

  const [curForm, setCurForm] = useState<AvailableDomainsType>('mail');
  
  if(isLoading) {
    return <div>Loading ...</div>
  }

  const domains = data?.map(({name}) => ({ label: name, value: name })) || [];

  return (
    <Card additionalClassName={styles['p-insert']}>
      <RadioBtn
        name="type"
        options={domains}
        className="l-grid__col l-grid__col--span-10"
        onValueChange={(x) => {setCurForm(x as AvailableDomainsType)}}
        defaultValue={curForm}
        {...BUTTON_PRESET}
      />
      {curForm === 'mail' && <FormMail />}
      {curForm === 'sms' && <FormSMS /> }
    </Card>
  )
}

export default Insert;
