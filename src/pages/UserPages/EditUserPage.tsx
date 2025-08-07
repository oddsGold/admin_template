import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta.tsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetCurrentUser, useUpdateUser } from '../../queries/user';
import { Loading } from '../../components/loadingBar/Loading';
import { UserRequest } from '../../types/users.ts';
import UserForm from '../../components/form/page-forms/UserForm.tsx';
import ComponentCard from '../../components/common/ComponentCard.tsx';
import { UseCrudPageLogic } from '../../hooks/useCrudPageLogic.ts';
import { useGetRoles } from '../../queries/role.ts';

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.from?.pathname ?? '/admin/users';

  const { user, isLoading: isCurrentUserLoading } = useGetCurrentUser(id ?? '');
  const { data, isLoading: isRolesLoading } = UseCrudPageLogic(useGetRoles);
  const { mutateAsync: updateUser } = useUpdateUser(id ?? '');

  const isLoading = isCurrentUserLoading || isRolesLoading;

  if (!id) {
    return (
      <div className="text-lg font-medium text-gray-800 dark:text-white/90">Data not found</div>
    );
  }

  const isEmptyData =
    !user ||
    (typeof user === 'object' && Object.keys(user).length === 0) ||
    !data ||
    (Array.isArray(data) && data.length === 0);

  const handleSubmit = async (values: UserRequest) => {
    try {
      await updateUser(values);
      navigate('/admin/users');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
          <Loading />
        </div>
      ) : (
        <>
          <PageMeta title="Edit user" description="Edit user" />
          <PageBreadcrumb
            breadcrumbs={[
              { title: 'Home', to: '/admin/dashboard' },
              { title: 'Users', to: '/admin/users' },
              { title: 'Edit user page' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit user">
                <UserForm
                  current={user}
                  defaultCurrent={{
                    login: '',
                    email: '',
                    role: '',
                    password: '',
                    password_confirmation: '',
                    tfa: 1,
                  }}
                  handleSubmit={handleSubmit}
                  roles={data}
                  backLinkPath={previousPath}
                />
              </ComponentCard>
            </div>
          )}
        </>
      )}
    </>
  );
}
