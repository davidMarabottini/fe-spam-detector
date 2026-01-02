import Card from "@/components/atoms/Card/Card";
import styles from './User.module.scss';
import { useMineDetails } from "@/hooks/useAuthenticationHooks";
import Typography from "@/components/atoms/Typography/Typography";
import Form from "@/components/organisms/form/Form";
import Stack from "@/components/atoms/Stack/Stack";
import { useTranslation } from "react-i18next";
import { Check, X, Save } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import type { UserForm } from "./User.types";
const User = () => {
  const {data, isLoading, error} = useMineDetails()
  const {t} = useTranslation("user");

  const [formDisabled, setFormDisabled] = useState(true);

  const options = [
    {label: 'Male', value: 'M'},
    {label: 'Female', value: 'F'},
    {label: 'Other', value: ''}
  ]

  if(isLoading) {
    return <div>Loading ...</div>
  }
  return (
    <Card additionalClassName={styles['p-user']}>
      <div className={styles["p-user__container"]}>
        <Typography variant="h2" >{t('title')}</Typography>
        {error && <Typography>errore</Typography>}
        <Form<UserForm>
          defaultValues={data}
          onSubmit={console.log}
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
              <Form.Select
                name="gender"
                label="gender"
                options={options}
                className="l-grid__col l-grid__col--span-6"
                rules={{ required: t('form.surname.error.required') }}
                disabled={formDisabled}
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
              autoDisabled={false}
            >
              <Save size={16} /> {t("form.submit")}
            </Form.Button>}
              <Form.Button
              additionalClassName={clsx("l-grid__col", {"l-grid__col--span-12": formDisabled, "l-grid__col--span-6": !formDisabled})}
              type="button"
              onClick={() => setFormDisabled(d => !d)}
              color={formDisabled ? 'primary' : 'secondary'}
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
