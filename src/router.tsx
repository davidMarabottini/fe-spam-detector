import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@layouts/PublicLayout';
import { PrivateLayout } from '@layouts/PrivateLayout';
import { ProtectedRoute } from './auth/protectedRoute';
import { privateRoutes, publicRoutes, userRoutes } from './constants/routes';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: publicRoutes
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <PrivateLayout />,
        children: [...privateRoutes, ...userRoutes]
      },
    ]
  },
]);
