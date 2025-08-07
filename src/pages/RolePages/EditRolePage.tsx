import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta.tsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../../components/loadingBar/Loading';
import ComponentCard from '../../components/common/ComponentCard.tsx';
import { UseCrudPageLogic } from '../../hooks/useCrudPageLogic.ts';
import { useGetCurrentRole, useGetResources, useUpdateRole } from '../../queries/role.ts';
import { RoleRequest } from '../../types/role.ts';
import RoleForm from '../../components/form/page-forms/RoleForm.tsx';

export default function EditRolePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.from?.pathname ?? '/admin/roles';

  const { role, isLoading: isCurrentUserLoading } = useGetCurrentRole(id ?? '');
  const { data: resources, isLoading: isResourcesLoading } = UseCrudPageLogic(useGetResources);
  const { mutateAsync: updateRole } = useUpdateRole(id ?? '');

  const isLoading = isCurrentUserLoading || isResourcesLoading;

  if (!id) {
    return (
      <div className="text-lg font-medium text-gray-800 dark:text-white/90">Data not found</div>
    );
  }

  const isEmptyData =
    !role ||
    (typeof role === 'object' && Object.keys(role).length === 0) ||
    !resources ||
    (Array.isArray(resources) && resources.length === 0);

  const handleSubmit = async (values: RoleRequest) => {
    try {
      await updateRole(values);
      navigate('/admin/roles');
    } catch (error) {
      console.error('Failed to update roles:', error);
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
              { title: 'Roles', to: '/admin/roles' },
              { title: 'Edit role page' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit user">
                <RoleForm
                  current={role}
                  defaultCurrent={{
                    label: '',
                    resources: [],
                  }}
                  resources={resources}
                  handleSubmit={handleSubmit}
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
