import { Route, Routes } from 'react-router-dom';
import { AuthErrorView } from './components/AuthErrorView';
import { ErrorPageDescriptionEnum, ErrorPageRoutePathEnum } from './ErrorPage.types';

export const ErrorPage = () => {
  return (
    <Routes>
      <Route>
        <Route
          path={ErrorPageRoutePathEnum.forbidden}
          element={<AuthErrorView status={ErrorPageDescriptionEnum.forbidden} />}
        />
        <Route path='*' element={<AuthErrorView status={ErrorPageDescriptionEnum.notFound} />} />
      </Route>
    </Routes>
  );
};
