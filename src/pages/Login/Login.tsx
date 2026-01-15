import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Login.module.scss";
import { Trans, useTranslation } from 'react-i18next';
import { useLogin } from '@/hooks/api/useAuthenticationHooks';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import { ROUTES } from '@constants/routes';
import Typography from '@/components/atoms/Typography/Typography';
import { LogIn } from 'lucide-react';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';

type LoginData = {username: string, password: string};

const Login = () => {
  const { mutate: login } = useLogin();
  const {t} = useTranslation('login');

  const onSubmit = (values: LoginData) => {
    login(values);
  };

  return (
    <div className={clsx(styles["p-login"], "l-grid")}>
      <Card additionalClassName="l-grid__col l-grid__col--span-12">
        <div className={styles["p-login__container"]}>
          <Form<LoginData> className={styles['p-login__form']} defaultValues={{ username: '', password: '' }} onSubmit={onSubmit}>
            <Stack spacing="md">
              <Form.Input
                name="username"
                rules={{ required: t('error.required') }}
                label={t('form.username.label')}
              />
              <Form.Input
                name="password"
                label={t('form.password.label')}
                type="password"
                rules={{ required: t('error.required') }}
              />
              <Form.Button additionalClassName={styles['p-login__button']} type="submit">
                <LogIn size={16} /> {t("form.submit")}
              </Form.Button>

              <Typography color="muted" variant="small" additionalClasses={styles['p-login__register-link']}>
                <Trans
                  i18nKey="register"
                  ns="login"
                  components={[
                    <LinkComponent to={ROUTES.REGISTRATION} key="link" />
                  ]}
                />
              </Typography>
            </Stack>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
