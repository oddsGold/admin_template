import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import {paths} from "../constants/routes";
import Home from "../pages/Dashboard/Home";
import UserProfiles from "../pages/ProfilePage/UserProfiles";
import UserPage from "../pages/UserPages/UserPage";

const PrivateRoutes = (): ReactElement[] => {
    return [
        <Route key="root" path={paths.ROOT} element={<Home />} />,
        <Route key="profile" path={paths.PROFILE} element={<UserProfiles />} />,
        <Route key="users" path={paths.USERS} element={<UserPage />} />,
    ];
};

export default PrivateRoutes;