import { GridHeader } from '../../types/grid-header';
import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import CrudPage from '../../components/common/CrudPage.tsx';
import { useDeleteUser, useGetUsers } from '../../queries/user.ts';

export default function UserPage() {
  const gridHeaderRow: GridHeader[] = [
    { name: 'id', label: '#' },
    { name: 'login', label: "Ім'я користувача" },
    { name: 'last_login_at', label: 'Дата останнього входу' },
    { name: 'created_at', label: 'Дата створення' },
    { name: 'role.label', label: 'Роль', badge: true },
  ];

  return (
    <>
      <PageMeta title="User page" description="User page" />
      <PageBreadcrumb
        breadcrumbs={[{ title: 'Home', to: '/admin/dashboard' }, { title: 'Users' }]}
      />
      <div className="space-y-6">
        <ComponentCard title="Users">
          <CrudPage
            buttonTitle="Users"
            createPath="/admin/users/create"
            editPath="/admin/users"
            gridHeaderRow={gridHeaderRow}
            useQuery={useGetUsers}
            useDeleteMutation={useDeleteUser}
            isFilter={true}
            isSearch={true}
            dnd={true}
          />
        </ComponentCard>
      </div>
    </>
  );
}
