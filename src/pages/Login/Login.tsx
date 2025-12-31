import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Login.module.scss";
import { Trans, useTranslation } from 'react-i18next';
import { useLogin } from '@hooks/useAuthenticationHooks';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import { ROUTES } from '@constants/routes';
import Typography from '@/components/atoms/Typography/Typography';
import { LogIn } from 'lucide-react';


type LoginData = {username: string, password: string};

const Login = () => {
  const { user } = useAuth();
  const { mutate: login, error } = useLogin();
  const navigate = useNavigate();
  const {t} = useTranslation('login');

  const onSubmit = (values: LoginData) => {
    login(values);
  };

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className={clsx(styles["p-login"], "l-grid")}>
      <Card additionalClassName="l-grid__col l-grid__col--span-12">
        <div className={styles["p-login__container"]}>
          <Typography variant="h2">{t('title')}</Typography>
          {error && <Typography additionalClasses={styles["p-login__error"]}>{t('form.error.invalid')}</Typography>}
          <Form<LoginData> defaultValues={{ username: '', password: '' }} onSubmit={onSubmit}>
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

              <Typography color="muted" additionalClasses={styles['p-login__register-link']}>
                <Trans
                  i18nKey="register"
                  ns="login"
                  components={[
                    <a href={ROUTES.REGISTRATION.path} key="link" />
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
