import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import {paths} from "../constants/routes";
import Home from "../pages/Dashboard/Home";
import UserProfiles from "../pages/ProfilePage/UserProfiles";
import UserPage from "../pages/UserPages/UserPage";
import CreateUserPage from "../pages/UserPages/CreateUserPage";

const PrivateRoutes = (): ReactElement[] => {
    return [
        <Route key="root" path={paths.ROOT} element={<Home />} />,
        <Route key="profile" path={paths.PROFILE} element={<UserProfiles />} />,
        <Route key="users" path={paths.USERS} element={<UserPage />} />,
        <Route key="create-users" path={paths.CREATEUSERS} element={<CreateUserPage />} />,
    ];
};

export default PrivateRoutes;