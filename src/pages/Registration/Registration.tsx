import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Registration.module.scss";
import { useTranslation } from 'react-i18next';
// import { useLogin } from '@/hooks/useAuthenticationHooks';
import Form from '@/components/form/Form';
import Stack from '@/components/atoms/Stack/Stack';
import Select from '@/components/atoms/Select/Select';

type RegistrationData = {
  name?: string
  surname?: string
  birthday?: string
  gender?: 'M' | 'F' | ''
  username?: string
  password?: string
};

const Registration = () => {
  // const { mutate: login, error } = useLogin();
  const {t} = useTranslation('registration');

  const onSubmit = (values: RegistrationData) => {
    console.log(values);
  };

  const init = {
    name: '',
    surname: '',
    birthday: '',
    gender: '',
    username: '',
    password: '',
  }

  return (
      <Card additionalClassName={clsx(styles['p-registration'], "l-grid__col l-grid__col--span-12")}>
        <div className={styles["p-registration__container"]}>
          <h2>{t('Form Registrazione')}</h2>
          {/* {error && <p className={styles["p-registration__error"]}>{t('form.error.invalid')}</p>} */}
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
                <Form.Input
                  className="l-grid__col l-grid__col--span-6"
                  name="birthday"
                  label={t('form.birthday.label')}
                  rules={{ required: t('error.required') }}
                />
                <Form.Select
                  name="gender"
                  label="gender"
                  options={[{label: 'Male', value: 'M'}, {label: 'Female', value: 'F'}, {label: 'Other', value: ''}]}
                  className="l-grid__col l-grid__col--span-6"
                  rules={{ required: t('error.required') }}
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
