import React from 'react';

import { ErrorPageRoutePathEnum } from '@src/pages/ErrorPage/ErrorPage.types';
import { useAuthContext } from '@src/contexts/AuthContextProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoute = () => {
  const location = useLocation();
  const { user } = useAuthContext();

  if (user === null) {
    return (
      <Navigate to={ErrorPageRoutePathEnum.forbidden} replace state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
};
