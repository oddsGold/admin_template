import { GridHeader } from '../../types/grid-header';
import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import CrudPage from '../../components/common/CrudPage';
import { useDeleteRole, useGetRoles } from '../../queries/role';

export default function RolePage() {
  const gridHeaderRow: GridHeader[] = [
    { name: 'id', label: '#' },
    { name: 'label', label: 'Роль', badge: true },
    { name: 'created_at', label: 'Дата створення' },
    { name: 'updated_at', label: 'Дата модифікації' },
  ];

  return (
    <>
      <PageMeta title="User page" description="User page" />
      <PageBreadcrumb
        breadcrumbs={[{ title: 'Home', to: '/admin/dashboard' }, { title: 'Roles' }]}
      />
      <div className="space-y-6">
        <ComponentCard title="Roles">
          <CrudPage
            buttonTitle="Role"
            createPath="/admin/roles/create"
            editPath="/admin/roles"
            gridHeaderRow={gridHeaderRow}
            useQuery={useGetRoles}
            useDeleteMutation={useDeleteRole}
            isFilter={true}
            isSearch={true}
            dnd={true}
          />
        </ComponentCard>
      </div>
    </>
  );
}
