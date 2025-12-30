import { createBrowserRouter } from 'react-router-dom';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import { PublicLayout } from '@layouts/PublicLayout';
import { PrivateLayout } from '@layouts/PrivateLayout';
import { ProtectedRoute } from './auth/protectedRoute';
import Registration from './pages/Registration/Registration';
import Status from './pages/Status/Status';
import { ROUTES } from './constants/routes';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTRATION,
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
            path: ROUTES.HOME,
            element: <Home />,
          },
          {
            path: ROUTES.STATUS,
            element: <Status />
          }
        ],
      },
    ],
  },
]);
