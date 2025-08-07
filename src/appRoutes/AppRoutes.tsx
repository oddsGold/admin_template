import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import AppLayout from '../layout/AppLayout';
import Home from '../pages/Dashboard/Home';
import { ScrollToTop } from '../components/common/ScrollToTop';
import NotFound from '../pages/OtherPage/NotFound';
import { useAuthStore } from '../store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../queries/client.ts';

const AppRoutes = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <Toaster position="top-right" richColors />

        <Routes>
          {!token && <>{PublicRoutes()}</>}

          {token && (
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              {PrivateRoutes()}
              <Route path="/404" element={<NotFound />} />
            </Route>
          )}

          <Route path="/login" element={<Navigate to={token ? '/' : '/login'} replace />} />
          <Route path="*" element={<Navigate to={token ? '/404' : '/login'} replace />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default AppRoutes;
