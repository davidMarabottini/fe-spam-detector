import { createBrowserRouter } from 'react-router-dom';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import { PublicLayout } from '@layouts/PublicLayout';
import { PrivateLayout } from '@layouts/PrivateLayout';
import { ProtectedRoute } from './auth/protectedRoute';
import Registration from './pages/Registration/Registration';
import Status from './pages/Status/Status';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Registration />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/status',
            element: <Status />
          }
        ],
      },
    ],
  },
]);
