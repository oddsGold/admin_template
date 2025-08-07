import { ReactElement } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { paths } from '../constants/routes';
import SignIn from '../pages/AuthPages/SignIn';
import SignUp from '../pages/AuthPages/SignUp';

export function PublicRoutes(): ReactElement[] {
  return [
    <Route key="signin" path={paths.SIGNIN} element={<SignIn />} />,
    <Route key="signin-redirect" path={paths.SIGNIN} element={<Navigate to="/" replace />} />,
    <Route key="signup" path={paths.SIGNUP} element={<SignUp />} />,
  ];
}
