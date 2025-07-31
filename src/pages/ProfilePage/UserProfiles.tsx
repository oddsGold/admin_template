import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserMetaCard from "../../components/userProfile/UserMetaCard";
import UserInfoCard from "../../components/userProfile/UserInfoCard";
import PageMeta from "../../components/common/PageMeta";
import {useGetAccount} from "../../queries/auth";
import {Loading} from "../../components/loadingBar/Loading";
import UserPasswordCard from "../../components/userProfile/UserPasswordCard";

export default function UserProfiles() {
    const {account, isLoading, isError} = useGetAccount();

    if (isLoading) {
        return (
            <div
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
                <Loading/>
            </div>
        );
    }

    return (
        <>
            <PageMeta
                title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb
                breadcrumbs={[{ title: 'Profile' }]}
            />
            <div
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Profile page
                </h3>
                <div className="space-y-6">
                    {!isError && account && <UserMetaCard account={account}/>}
                    {!isError && account && <UserInfoCard account={account}/>}
                    <UserPasswordCard />
                </div>
            </div>
        </>
    );
}
