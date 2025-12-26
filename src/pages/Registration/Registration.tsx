import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Registration.module.scss";
import { useTranslation } from 'react-i18next';
import Form from '@/components/organisms/form/Form';
import Stack from '@/components/atoms/Stack/Stack';
import type { RegistrationData } from './Registration.types';
import { useInsertUser } from '@/hooks/useUserHooks';
import { VALIDATIONS_EMAIL } from '@/constants/validations';

const Registration = () => {
  const {t} = useTranslation('registration');
  const {mutate: insertUser, error} = useInsertUser();

  const onSubmit = (values: RegistrationData) => {
    insertUser(values);
  };

  const init = {
    name: '',
    surname: '',
    // birthday: '',
    gender: '' as 'M' | 'F' | '',
    username: '',
    password: '',
  }

  return (
    <Card additionalClassName={clsx(styles['p-registration'], "l-grid__col l-grid__col--span-12")}>
      <div className={styles["p-registration__container"]}>
        <h2>{t('Form Registrazione')}</h2>
        {error && <p>errore</p>}
        <Form<RegistrationData>
          defaultValues={init}
          onSubmit={onSubmit}
        >
          <Stack spacing='md'>
            <div className="l-grid">
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="name"
                label={t('form.name.label')}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="surname"
                label={t('form.surname.label')}
                rules={{ required: t('error.required') }}
              />
              {/* TODO: implementare un datePicker e aggiungere data di nascita */}
              <Form.Select
                name="gender"
                label="gender"
                options={[{label: 'Male', value: 'M'}, {label: 'Female', value: 'F'}, {label: 'Other', value: ''}]}
                className="l-grid__col l-grid__col--span-6"
                rules={{ required: t('error.required') }}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="email"
                label={t('form.email.label')}
                rules={{
                  required: t('error.required'),
                  pattern: VALIDATIONS_EMAIL,
                }}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="username"
                label={t('form.username.label')}
                rules={{ required: t('error.required') }}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="password"
                label={t('form.password.label')}
                type="password"
                rules={{ required: t('error.required') }}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="repeatPassword"
                label={t('form.repeatPassword.label')}
                type="password"
                rules={{ required: t('error.required') }}
              />
            </div>
            <Form.Button type="submit">
              {t("form.submit")}
            </Form.Button>
          </Stack>
        </Form>
      </div>
    </Card>
  );
};

export default Registration;
