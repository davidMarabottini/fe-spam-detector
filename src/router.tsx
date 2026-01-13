import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute } from './auth/protectedRoute';
import { commonRoutes, privateRoutes, publicRoutes, userRoutes } from './constants/routes';
import { GuestRoute } from './auth/guestRoute';
import { Suspense } from 'react';
import type { LucideIcon } from 'lucide-react';

export type HandleType = {key: string, label: string, Icon: LucideIcon}

const generateChildren = (routes: Array<{path: string; Element: React.ComponentType; handle?: HandleType;}>) => {
  return routes.map(({path, Element, handle}) => ({
    path,
    element: (
      <Suspense fallback={<div className="spinner">Caricamento...</div>}>
        <Element />
      </Suspense>
    ),
    handle
  }));
};

export const router = createBrowserRouter([{
  element: <MainLayout />,
  children: [
    ...generateChildren(commonRoutes),
    ...[{
      element: <GuestRoute />,
      children: generateChildren(publicRoutes)
    }],
    ...[{
      element: <ProtectedRoute />,
      children: generateChildren([...privateRoutes, ...userRoutes])
    }]
  ]
}])
