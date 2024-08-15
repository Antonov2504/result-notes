import {
  BackgroundImage,
  Box,
  Button,
  Center,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import BgLogin from '@src/assets/images/bg-login.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Page } from '@src/constants/pages';
import { UserData } from '@src/types';
import { useAuthContext } from '@src/contexts/AuthContextProvider';
import { useEffect } from 'react';
import { SigninForm } from './LoginPage.types';

export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, onSignIn } = useAuthContext();

  const form = useForm({
    mode: 'controlled',
    initialValues: { login: '', password: '' },
    validate: {
      login: hasLength({ min: 3 }, 'Логин должен содержать 3 символа'),
    },
  });

  const from = location.state?.from || '/';

  const onSubmit = (values: SigninForm) => {
    const users: Record<string, UserData> = JSON.parse(localStorage.getItem('users')) || null;
    const user = users?.[values.login];

    if (!user || user.password !== values.password) {
      form.setErrors({
        login: ' ',
        password: 'Некорректный логин или пароль',
      });

      return;
    }

    onSignIn(values.login, () => {
      navigate(from, {
        replace: true,
      });
    });
  };

  useEffect(() => {
    if (user) {
      navigate(from, {
        replace: true,
      });
    }
  }, [from, navigate, user]);

  const renderForm = () => {
    return (
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput {...form.getInputProps('login')} label='Логин' />

        <PasswordInput label='Пароль' {...form.getInputProps('password')} withAsterisk />

        <Button type='submit' mt='md' disabled={!Object.values(form.getValues()).every(Boolean)}>
          Войти
        </Button>
      </form>
    );
  };

  return (
    <Box>
      <BackgroundImage
        src={BgLogin}
        radius='xs'
        w='100vw'
        h='100vh'
        style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
      >
        <Center mx='auto'>
          <Stack>
            <Title order={1} mt='50px'>
              Вход
            </Title>
            {renderForm()}

            <Link to={Page.register} replace>
              Зарегистрироваться
            </Link>
          </Stack>
        </Center>
      </BackgroundImage>
    </Box>
  );
};
