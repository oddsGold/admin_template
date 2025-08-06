import {SidebarProvider, useSidebar} from "../context/SidebarContext";
import {Outlet} from "react-router-dom";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import {useGetAccount} from "../queries/auth";
import {Loading} from "../components/loadingBar/Loading";

const LayoutContent: React.FC = () => {
    const {isExpanded, isHovered, isMobileOpen} = useSidebar();
    const {account, isLoading: isLoadingAccount, isError} = useGetAccount();
    const isAccountReady = !isLoadingAccount && !!account;

    return (
        <div className="min-h-screen xl:flex">
            <div>
                <AppSidebar isAccountReady={isAccountReady}/>
                <Backdrop/>
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${
                    isExpanded || isHovered ? "lg:ml-[240px]" : "lg:ml-[90px]"
                } ${isMobileOpen ? "ml-0" : ""}`}
            >
                {isLoadingAccount ? (
                    <>
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
                            <Loading />
                        </div>
                    </>
                ) : (
                    <>
                        {!isError && account && <AppHeader account={account} />}
                        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                            <Outlet />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const AppLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <LayoutContent/>
        </SidebarProvider>
    );
};

export default AppLayout;
