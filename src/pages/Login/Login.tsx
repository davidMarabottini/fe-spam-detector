import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import Card from '@components/atoms/Card/Card';
import Button from '@components/atoms/Button/Button';
import clsx from 'clsx';
import styles from "./Login.module.scss";
import Input from '@components/atoms/Input/Input';
import { useForm, Controller } from "react-hook-form";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: { username: '', password: '' }
  });

  const onSubmit = (data: { username: string; password: string }) => {
    console.log('Login data:', data);
    login();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={clsx(styles["c-login"], "l-grid")}>
      <Card additionalClassName="l-grid__col l-grid__col--span-12">
        <div className={styles["c-login__container"]}>
          <h2>Entra</h2>
          <form className={styles["c-login__form"]} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username richiesto" }}
              render={({ field }) => (
                <Input {...field} label="Username" />
              )}
            />
            
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password richiesta" }}
              render={({ field }) => (
                <Input {...field} type="password" label="Password" />
              )}
            />

            <Button type="submit" color="primary" disabled={formState.isSubmitting || !formState.isValid}>
              Login
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
