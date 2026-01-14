import type { MarkRequired } from "@/types/utilities.types";
import { Form, LogIn, User, Hourglass, PlusCircle, SettingsIcon, BrainCircuit, HomeIcon, type LucideIcon } from "lucide-react";
import React, { lazy, type LazyExoticComponent } from "react";
import type { RouteObject } from "react-router-dom";

const Cronology = lazy(() => import("@/pages/Cronology/Cronology"));
const Insert = lazy(() => import("@/pages/Insert/Insert"));
const Settings = lazy(() => import("@/pages/Settings/Settings"));
const AIAnalyze = lazy(() => import("@/pages/AIAnalyze/AIAnalyze"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Registration = lazy(() => import("@/pages/Registration/Registration"));
const UserPage = lazy(() => import("@/pages/User/User"));
const Status = lazy(() => import("@/pages/Status/Status"));
const Home = lazy(() => import("@/pages/Home/Home"));

export type RouteHandle = {
  key: string;
  label: string;
  Icon: LucideIcon;
};

export type AppRouteObject = MarkRequired<RouteObject, 'path'> & {
  Element: LazyExoticComponent<() => React.JSX.Element>;
  handle?: RouteHandle;
}

export const commonRoutes: AppRouteObject[] = [
  {path: '/', Element: Home, handle: {key: 'HOME', label: 'labels.home', Icon: HomeIcon}},
]

export const publicRoutes: AppRouteObject[] = [
  ...commonRoutes,
  {path: '/login', Element: Login, handle: {key: 'LOGIN', label: 'labels.login', Icon: LogIn}},
  {path: '/registration', Element: Registration, handle: {key: 'REGISTRATION', label: 'labels.registration', Icon: Form}},
]

export const publicOnlyMenu = publicRoutes.map(({path, handle}) => ({path, handle}));

export const privateRoutes: AppRouteObject[] = [
  ...commonRoutes,
  {path: '/analyze', Element: AIAnalyze, handle: {key: 'ANALYZE', label: 'labels.analyze', Icon: BrainCircuit}},
  {path: '/status', Element: Status, handle: {key: 'STATUS', label: 'labels.status', Icon: User} },
  {path: '/cronology', Element: Cronology, handle: {key: 'CRONOLOGY', label: 'labels.cronology', Icon: Hourglass} },
  {path: '/insert', Element: Insert, handle: {key: 'INSERT', label: 'labels.insert', Icon: PlusCircle} },
]

export const privateMenu = privateRoutes.map(({path, handle}) => ({path, handle}));

export const userRoutes: AppRouteObject[] = [
  {path: '/user', Element: UserPage, handle: {key: 'USER', label: 'labels.user', Icon: User} },
  {path: '/settings', Element: Settings, handle: {key: 'SETTINGS', label: 'labels.settings', Icon: SettingsIcon} },
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
} as {[n: string]: string};

export const MENUS = {
  public: publicOnlyMenu,
  private: privateMenu,
  user: userMenu,
};
