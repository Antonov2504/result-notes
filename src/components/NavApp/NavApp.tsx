import { Loader } from '@mantine/core';
import { NotesPage } from '@src/pages/NotesPage';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from '@src/constants/pages';
import { ErrorPage } from '@src/pages/ErrorPage';
import { AuthContextProvider } from '@src/contexts/AuthContextProvider';
import { AppContextProvider } from '@src/contexts/AppContextProvider';
import { PrivateRoute } from '../PrivateRoute';
import { ErrorBoundary } from '../ErrorBoundary';

const LoginPage = lazy(() =>
  import('@src/pages/LoginPage').then((module) => ({ default: module.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('@src/pages/RegisterPage').then((module) => ({ default: module.RegisterPage }))
);

export const NavApp = () => {
  return (
    <Suspense fallback={<Loader color='blue' />}>
      <ErrorBoundary>
        <AuthContextProvider>
          <AppContextProvider>
            <Routes>
              <Route path={Page.login} element={<LoginPage />} />
              <Route path={Page.register} element={<RegisterPage />} />
              <Route path={Page.index} element={<Navigate to={Page.notes} replace />} />
              <Route element={<PrivateRoute />}>
                <Route path={Page.notes} element={<NotesPage />} />
              </Route>
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </AppContextProvider>
        </AuthContextProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
