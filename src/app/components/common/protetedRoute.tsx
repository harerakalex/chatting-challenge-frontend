import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from '../../redux';
import { ILogin } from '../../redux/interfaces';

const ProtectedRoutes = ({ component: Component, ...rest }: any) => {
  const { isAuthenticated }: ILogin = useSelector(
    (state: AppState) => state.login,
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoutes;
