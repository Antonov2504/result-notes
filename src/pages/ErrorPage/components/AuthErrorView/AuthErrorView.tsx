import { useLocation, useNavigate } from 'react-router-dom';
import { Page } from '@src/constants/pages';
import { Button } from '@mantine/core';
import * as Styled from './AuthErrorView.styled';
import { ErrorPageDescriptionEnum, ErrorPageRoutePathEnum } from '../../ErrorPage.types';
import { errorsMock } from '../../ErrorPage.mocks';

type AuthErrorViewProps = {
  status: ErrorPageDescriptionEnum;
};

export const AuthErrorView = ({ status }: AuthErrorViewProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const error = errorsMock[status];
  const { code, title } = error;

  const handleGoHome = () => {
    navigate(Page.notes);
  };

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Code>{code}</Styled.Code>
        <Styled.Title>{title}</Styled.Title>
        {code === errorsMock[ErrorPageDescriptionEnum.notFound].code && (
          <Button variant='fullfield' color='blue' onClick={handleGoHome}>
            На главную
          </Button>
        )}
        {location.pathname === ErrorPageRoutePathEnum.forbidden && (
          <Styled.Footer>
            <Styled.FooterLink to={Page.login} replace state={location.state}>
              Войти
            </Styled.FooterLink>
            <Styled.FooterLink to={Page.register} replace>
              Зарегистрироваться
            </Styled.FooterLink>
          </Styled.Footer>
        )}
      </Styled.Content>
      <Styled.Background />
    </Styled.Container>
  );
};
