import Cronology from "@/pages/Cronology/Cronology";
import Insert from "@/pages/Insert/Insert";
import Settings from "@/pages/Settings/Settings";
import Home from "@pages/Home/Home";
import Login from "@pages/Login/Login";
import Registration from "@pages/Registration/Registration";
import UserPage from "@pages/User/User";
import Status from "@pages/Status/Status";
import { Form, HomeIcon, LogIn, User, Hourglass, PlusCircle, SettingsIcon } from "lucide-react";

export const publicRoutes = [
  {path: '/login', element: <Login />, handle: {key: 'LOGIN', label: 'labels.login', Icon: LogIn}},
  {path: '/registration', element: <Registration />, handle: {key: 'REGISTRATION', label: 'labels.registration', Icon: Form}},
  {path: '/analyze', element: <Home />, handle: {key: 'HOME_PUBLIC', label: 'labels.home', Icon: HomeIcon}},
]

export const publicMenu = publicRoutes.map(({path, handle}) => ({path, handle}));

export const privateRoutes = [
  {path: '/', element: <Home />, handle: {key: 'HOME', label: 'labels.home', Icon: HomeIcon}},
  {path: '/status', element: <Status />, handle: {key: 'STATUS', label: 'labels.status', Icon: User} },
  {path: '/cronology', element: <Cronology />, handle: {key: 'CRONOLOGY', label: 'labels.cronology', Icon: Hourglass} },
  {path: '/insert', element: <Insert />, handle: {key: 'INSERT', label: 'labels.insert', Icon: PlusCircle} },
]

export const privateMenu = privateRoutes.map(({path, handle}) => ({path, handle}));

export const userRoutes = [
  {path: '/user', element: <UserPage />, handle: {key: 'USER', label: 'labels.user', Icon: User} },
  {path: '/settings', element: <Settings />, handle: {key: 'SETTINGS', label: 'labels.settings', Icon: SettingsIcon} },
];

export const userMenu = userRoutes.map(({path, handle}) => ({path, handle}));

export const ROUTES = {
  ...[
    ...publicRoutes, 
    ...privateRoutes, 
    ...userRoutes
  ].reduce((acc, {handle, path}) => (
    {
      ...acc,
      [handle.key]: path
    }
  ), {}),
} as const;
