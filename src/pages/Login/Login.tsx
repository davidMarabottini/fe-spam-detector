import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import Card from '@components/atoms/Card/Card';
import Button from '@components/atoms/Button/Button';
import clsx from 'clsx';
import styles from "./Login.module.scss";
import Input from '@components/atoms/Input/Input';
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { useLogin } from '@/hooks/useAuthenticationHooks';

const Login = () => {
  const { user } = useAuth();
  const { mutate: login, isPending, error } = useLogin();
  const navigate = useNavigate();
  const {t} = useTranslation('login');

  const { control, handleSubmit, formState } = useForm({
    defaultValues: { username: '', password: '' }
  });

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className={clsx(styles["c-login"], "l-grid")}>
      <Card additionalClassName="l-grid__col l-grid__col--span-12">
        <div className={styles["c-login__container"]}>
          <h2>{t('title')}</h2>
          {error && <p className={styles["c-login__error"]}>{t('form.error.invalid')}</p>}
          <form className={styles["c-login__form"]} onSubmit={handleSubmit(() => login())}>
            <Controller
              name="username"
              control={control}
              rules={{ required: t('form.username.error.required') }}
              render={({ field }) => (
                <Input {...field} label={t('form.username.label')} />
              )}
            />
            
            <Controller
              name="password"
              control={control}
              rules={{ required: t('form.password.error.required') }}
              render={({ field }) => (
                <Input {...field} type="password" label={t('form.password.label')} />
              )}
            />

            <Button type="submit" color="primary" disabled={isPending || !formState.isValid}>
              {t("form.submit")}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
