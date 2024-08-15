import React, { useEffect, useState } from 'react';
import {
  BackgroundImage,
  Box,
  Button,
  Center,
  PasswordInput,
  Popover,
  Progress,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Page } from '@src/constants/pages';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@src/contexts/AuthContextProvider';
import BgLogin from '@src/assets/images/bg-login.jpg';
import { requirements } from './RegisterPage.constants';
import { PasswordRequirement } from './components/PasswordRequirement';
import { getStrength } from './RegisterPage.utils';
import { SignupForm } from './RegisterPage.types';

export const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, onSignUp } = useAuthContext();

  const form = useForm({
    mode: 'controlled',
    initialValues: { login: '', password: '', repeatPassword: '' },
    validate: {
      login: hasLength({ min: 3 }, 'Логин должен содержать 3 символа'),
    },
  });

  const from = location.state?.from || '/';

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.getValues().password)}
    />
  ));

  const strength = getStrength(form.getValues().password);
  const warningColor = strength > 50 ? 'yellow' : 'red';
  const color = strength === 100 ? 'teal' : warningColor;

  const isSubmitDisabled =
    !Object.values(form.getValues())
      .map((value) => value.trim())
      .every(Boolean) ||
    !!Object.keys(form.errors).length ||
    strength < 100;

  const handleSubmit = (values: SignupForm) => {
    if (values.repeatPassword !== values.password) {
      form.setErrors({ password: 'Пароли не совпадают', repeatPassword: 'Пароли не совпадают' });

      return;
    }

    onSignUp(values, () => {
      navigate(Page.login, {
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
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput {...form.getInputProps('login')} label='Логин' />

        <Popover
          opened={popoverOpened}
          position='bottom'
          width='target'
          transitionProps={{ transition: 'pop' }}
        >
          <Popover.Target>
            <div
              onFocusCapture={() => setPopoverOpened(true)}
              onBlurCapture={() => setPopoverOpened(false)}
            >
              <PasswordInput
                label='Пароль'
                {...form.getInputProps('password')}
                onFocus={() => form.clearErrors()}
                visible={visible}
                onVisibilityChange={toggle}
                withAsterisk
              />
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <Progress color={color} value={strength} size={5} mb='xs' />
            <PasswordRequirement
              label='Не менее 6 символов'
              meets={form.getValues().password.length > 5}
            />
            {checks}
          </Popover.Dropdown>
        </Popover>

        <PasswordInput
          label='Повторите пароль'
          {...form.getInputProps('repeatPassword')}
          onFocus={() => form.clearErrors()}
          visible={visible}
          onVisibilityChange={toggle}
          withAsterisk
        />

        <Button type='submit' mt='md' disabled={isSubmitDisabled}>
          Зарегистрироваться
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
              Регистрация
            </Title>
            {renderForm()}

            <Link to={Page.login} replace>
              Войти
            </Link>
          </Stack>
        </Center>
      </BackgroundImage>
    </Box>
  );
};
