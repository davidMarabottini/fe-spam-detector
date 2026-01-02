import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Registration.module.scss";
import { Trans, useTranslation } from 'react-i18next';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import type { RegistrationForm } from './Registration.types';
import { useInsertUser } from '@hooks/useUserHooks';
import { VALIDATIONS_EMAIL } from '@constants/validations';
import { ROUTES } from '@constants/routes';
import Typography from '@components/atoms/Typography/Typography';
import { Check, X } from 'lucide-react';

const Registration = () => {
  const {t} = useTranslation('registration');
  const {mutate: insertUser, error} = useInsertUser();

  const onSubmit = (values: RegistrationForm) => {
    const { repeatPassword: _repeatPassword, ...payload } = values;
    insertUser(payload);
  };

  const init = {
    name: '',
    surname: '',
    // birthday: '',
    gender: '' as 'M' | 'F' | '',
    username: '',
    password: '',
  }

  const options = [
    {label: 'Male', value: 'M'},
    {label: 'Female', value: 'F'},
    {label: 'Other', value: ''}
  ]

  const btnClass = clsx(styles['p-registration__button'], "l-grid__col l-grid__col--span-6");

  return (
    <Card additionalClassName={clsx(styles['p-registration'], "l-grid__col l-grid__col--span-12")}>
      <div className={styles["p-registration__container"]}>
        <Typography variant="h2" >{t('Form Registrazione')}</Typography>
        {error && <Typography>errore</Typography>}
        <Form<RegistrationForm>
          defaultValues={init}
          onSubmit={onSubmit}
        >
          <Stack spacing='md'>
            <div className="l-grid">
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="name"
                label={t('form.name.label')}
                rules={{ required: t('form.name.error.required') }}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="surname"
                label={t('form.surname.label')}
                rules={{ required: t('form.surname.error.required') }}
              />
              {/* TODO: implementare un datePicker e aggiungere data di nascita */}
              <Form.Select
                name="gender"
                label="gender"
                options={options}
                className="l-grid__col l-grid__col--span-6"
                rules={{ required: t('form.gender.error.required') }}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="email"
                label={t('form.email.label')}
                rules={{
                  required: t('form.email.error.required'),
                  pattern: {
                    value: VALIDATIONS_EMAIL,
                    message: t('form.email.error.errorFormat'),
                  },
                }}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="username"
                label={t('form.username.label')}
                rules={{ required: t('form.username.error.required') }}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="password"
                label={t('form.password.label')}
                type="password"
                rules={{ required: t('form.password.error.required') }}
              />
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="repeatPassword"
                label={t('form.repeatPassword.label')}
                type="password"
                rules={{
                  required: t('form.repeatPassword.error.required'),
                  validate: (value, formValues) => 
                    value === formValues.password || t('form.error.passwordsDoNotMatch')
                }}
              />
              <div></div>
            <Form.Button
              additionalClassName={btnClass}
              type="submit"
              autoDisabled={false}
            >
              <Check size={16} /> {t("form.submit")}
            </Form.Button>
            <Form.Button
              additionalClassName={btnClass}
              type="reset"
              color='secondary'
              autoDisabled={false}
            >
              <X size={16} /> Reset
            </Form.Button>
            </div>
            <Typography
              color="muted"
              additionalClasses={styles['p-registration__login-link']}
              variant="small"
            >
              <Trans
                i18nKey="login"
                ns="registration"
                components={[<a href={ROUTES.LOGIN} key="link" />]}
              />
            </Typography>
          </Stack>
        </Form>
      </div>
    </Card>
  );
};

export default Registration;
