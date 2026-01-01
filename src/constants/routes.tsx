import Cronology from "@/pages/Cronology/Cronology";
import Insert from "@/pages/Insert/Insert";
import Settings from "@/pages/Settings/Settings";
import Home from "@pages/Home/Home";
import Login from "@pages/Login/Login";
import Registration from "@pages/Registration/Registration";
import Status from "@pages/Status/Status";
import { Form, HomeIcon, LogIn, User, Hourglass, PlusCircle, SettingsIcon } from "lucide-react";



export const publicRoutes = [
  {key: 'LOGIN', path: '/login', element: <Login />, label: 'labels.login', icon: <LogIn size={16} />},
  {key: 'REGISTRATION', path: '/registration', element: <Registration />, label: 'labels.registration', icon: <Form size={16} />},
  {key: 'HOME_PUBLIC', path: '/analyze', element: <Home />, label: 'labels.home', icon: <HomeIcon size={16} />},
]

export const privateRoutes = [
  {key: 'HOME', path: '/', element: <Home />, label: 'labels.home', icon: <HomeIcon size={16} />},
  {key: 'STATUS', path: '/status', element: <Status />, label: 'labels.status', icon: <User size={16} /> },
  {key: 'CRONOLOGY', path: '/cronology', element: <Cronology />, label: 'labels.cronology', icon: <Hourglass size={16} /> },
  {key: 'INSERT', path: '/insert', element: <Insert />, label: 'labels.insert', icon: <PlusCircle size={16} /> },
]

export const userRoutes = [
  {key: 'USER', path: '/user', element: <User />, label: 'labels.user', icon: <User size={12} /> },
  {key: 'SETTINGS', path: '/settings', element: <Settings />, label: 'labels.settings', icon: <SettingsIcon size={12} /> },
];

export const ROUTES = {
  ...[...publicRoutes, ...privateRoutes, ...userRoutes].reduce((acc, x) => ({...acc, ...{[x.key]: x}}), {}),
} as const;
