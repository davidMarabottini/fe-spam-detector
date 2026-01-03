import Card from "@components/atoms/Card/Card";
import styles from './User.module.scss';
import { useMineDetails, useUpdateMineDetails } from "@hooks/useAuthenticationHooks";
import Typography from "@components/atoms/Typography/Typography";
import Form from "@components/organisms/form/Form";
import Stack from "@components/atoms/Stack/Stack";
import { useTranslation } from "react-i18next";
import { Check, X, Save, Mars, Venus, Transgender } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import type { UserForm } from "./User.types";
import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";
const User = () => {
  const {classBase, ...iconPresetRest} = ICON_PRESET;
  const {data, isLoading, error} = useMineDetails()
  const {t} = useTranslation("user");
  
  const [formDisabled, setFormDisabled] = useState(true);
  const {mutate: updateUser} = useUpdateMineDetails();


  const options = [
    {label: t('form.gender.options.male'), Icon: Mars, value: 'M'},
    {label: t('form.gender.options.female'), Icon: Venus, value: 'F'},
    {label: t('form.gender.options.other'), Icon: Transgender, value: ''}
  ]

  if(isLoading) {
    return <div>Loading ...</div>
  }
  return (
    <Card additionalClassName={styles['p-user']}>
      <div className={styles["p-user__container"]}>
        {error && <Typography>errore</Typography>}
        <Form<UserForm>
          defaultValues={data}
          onSubmit={updateUser}
        >
          <Stack spacing='md'>
            <div className="l-grid">
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="name"
                label={t('form.name.label')}
                rules={{ required: t('form.name.error.required') }}
                disabled={formDisabled}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="surname"
                label={t('form.surname.label')}
                rules={{ required: t('form.surname.error.required') }}
                disabled={formDisabled}
              />
              <Form.RadioBtn
                name="gender"
                label={t("form.gender.label")}
                className={clsx(classBase, "l-grid__col l-grid__col--span-6")}
                rules={{ required: t('form.gender.error.required') }}
                gap="lg"
                options={options}
                disabled={formDisabled}
                {...iconPresetRest}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="email"
                label={t('form.email.label')}
                rules={{ required: t('form.surname.error.required') }}
                disabled
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="username"
                label={t('form.username.label')}
                rules={{ required: t('form.surname.error.required') }}
                disabled
              />
              <div></div>
              {!formDisabled && <Form.Button
              additionalClassName="l-grid__col l-grid__col--span-6"
              type="submit"
              // autoDisabled={false}
            >
              <Save size={16} /> {t("form.submit")}
            </Form.Button>}
              <Form.Button
              additionalClassName={clsx("l-grid__col", {"l-grid__col--span-12": formDisabled, "l-grid__col--span-6": !formDisabled})}
              type="button"
              onClick={() => setFormDisabled(d => !d)}
              color={formDisabled ? 'success' : 'error'}
              autoDisabled={false}
            >
              {formDisabled ? <Check size={16} /> : <X size={16} />} {t(formDisabled ? "form.enable" : "form.disable")}
            </Form.Button>
            </div>
          </Stack>
        </Form>
      </div>
    </Card>
  )
}

export default User;
