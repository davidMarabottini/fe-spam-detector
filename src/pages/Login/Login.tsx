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

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {t} = useTranslation('login');

  const { control, handleSubmit, formState } = useForm({
    defaultValues: { username: '', password: '' }
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={clsx(styles["c-login"], "l-grid")}>
      <Card additionalClassName="l-grid__col l-grid__col--span-12">
        <div className={styles["c-login__container"]}>
          <h2>{t('title')}</h2>
          <form className={styles["c-login__form"]} onSubmit={handleSubmit(login)}>
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

            <Button type="submit" color="primary" disabled={formState.isSubmitting || !formState.isValid}>
              {t("form.submit")}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
