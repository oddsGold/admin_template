import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import {useLocation, useNavigate} from "react-router-dom";
import { UseCrudPageLogic } from "../../hooks/useCrudPageLogic";
import {useCreateRole, useGetResources} from "../../queries/role";
import {Loading} from "../../components/loadingBar/Loading.tsx";
import {RoleRequest} from "../../types/role.ts";
import RoleForm from "../../components/form/page-forms/RoleForm";



export default function CreateRolePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = location.state?.from?.pathname ?? '/admin/roles';

    const { mutateAsync: createRole, isPending } = useCreateRole();
    const { data } = UseCrudPageLogic(useGetResources);

    const onSubmit = async (data: RoleRequest) => {
        try {
            await createRole(data);
            navigate('/admin/roles');
        } catch (error) {
            console.error('Failed to create role:', error);
        }
    };

    if (isPending) {
        return (
            <div
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
                <Loading/>
            </div>
        );
    }

    return (
        <>
            <PageMeta title="Create new role" description="Create new role" />
            <PageBreadcrumb
                breadcrumbs={[
                    { title: 'Home', to: '/admin/dashboard' },
                    { title: 'Roles', to: '/admin/roles' },
                    { title: 'Create new role' },
                ]}
            />

            <div className="space-y-6">
                <ComponentCard title="Create role">
                    <RoleForm
                        defaultCurrent={{
                            label: '',
                            resources: [],
                        }}
                        handleSubmit={onSubmit}
                        resources={data}
                        backLinkPath={previousPath}
                    />
                </ComponentCard>
            </div>
        </>
    )
}