import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import {paths} from "../constants/routes";
import Home from "../pages/Dashboard/Home";
import UserProfiles from "../pages/ProfilePage/UserProfiles";
import UserPage from "../pages/UserPages/UserPage";
import CreateUserPage from "../pages/UserPages/CreateUserPage";
import EditUserPage from "../pages/UserPages/EditUserPage";
import RolePage from "../pages/RolePages/RolePage";
import CreateRolePage from "../pages/RolePages/CreateRolePage";
import EditRolePage from "../pages/RolePages/EditRolePage";
import ImagePage from "../pages/DownloadPage/ImagePage";
import FilePage from "../pages/DownloadPage/FilePage";

const PrivateRoutes = (): ReactElement[] => {
    return [
        <Route key="root" path={paths.ROOT} element={<Home />} />,
        <Route key="profile" path={paths.PROFILE} element={<UserProfiles />} />,
        <Route key="users" path={paths.USERS} element={<UserPage />} />,
        <Route key="create-users" path={paths.CREATEUSERS} element={<CreateUserPage />} />,
        <Route key="edit-users" path={paths.EDITUSERS} element={<EditUserPage />} />,
        <Route key="roles" path={paths.ROLES} element={<RolePage />} />,
        <Route key="create-roles" path={paths.CREATROLES} element={<CreateRolePage />} />,
        <Route key="edit-roles" path={paths.EDITROLES} element={<EditRolePage />} />,
        <Route key="download-images" path={paths.IMAGES} element={<ImagePage />} />,
        <Route key="download-files" path={paths.FILES} element={<FilePage />} />,
    ];
};

export default PrivateRoutes;