import type { MarkRequired, ValueOf } from "@/types/utilities.types";
import { Form, LogIn, User, Hourglass, PlusCircle, SettingsIcon, BrainCircuit, HomeIcon, type LucideIcon } from "lucide-react";
import React, { lazy, type LazyExoticComponent } from "react";
import { AUTH_DOMAINS, AVAILABLE_MENUS } from "./configuration";
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
  domain: ValueOf<typeof AUTH_DOMAINS>[];
  menu: ValueOf<typeof AVAILABLE_MENUS>[];
};

export type AppRouteObject = MarkRequired<RouteObject, 'path'> & {
  Element: LazyExoticComponent<() => React.JSX.Element>;
  handle: RouteHandle;
}

type MenuItem = {
  path: string;
  handle: RouteHandle;
};

type StructuredMenu = Partial<
  Record<
    ValueOf<typeof AUTH_DOMAINS>,
    Partial<Record<ValueOf<typeof AVAILABLE_MENUS>, MenuItem[]>>
  >
>;

const ROUTE_CONFIGS: readonly AppRouteObject[] = Object.freeze([
  {path: '/', Element: Home, handle: {key: 'HOME', label: 'labels.home', Icon: HomeIcon, domain: [AUTH_DOMAINS.PUBLIC, AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/login', Element: Login, handle: {key: 'LOGIN', label: 'labels.login', Icon: LogIn, domain: [AUTH_DOMAINS.PUBLIC], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/registration', Element: Registration, handle: {key: 'REGISTRATION', label: 'labels.registration', Icon: Form, domain: [AUTH_DOMAINS.PUBLIC], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/analyze', Element: AIAnalyze, handle: {key: 'ANALYZE', label: 'labels.analyze', Icon: BrainCircuit, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/status', Element: Status, handle: {key: 'STATUS', label: 'labels.status', Icon: User, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]} },
  {path: '/cronology', Element: Cronology, handle: {key: 'CRONOLOGY', label: 'labels.cronology', Icon: Hourglass, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]} },
  {path: '/insert', Element: Insert, handle: {key: 'INSERT', label: 'labels.insert', Icon: PlusCircle, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]} },
  {path: '/user', Element: UserPage, handle: {key: 'USER', label: 'labels.user', Icon: User, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.USER]} },
  {path: '/settings', Element: Settings, handle: {key: 'SETTINGS', label: 'labels.settings', Icon: SettingsIcon, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.USER]} },
]);

export type TStructRoute = ValueOf<typeof AUTH_DOMAINS> | `${ValueOf<typeof AUTH_DOMAINS>}__${ValueOf<typeof AUTH_DOMAINS>}`

// export const structuredRoutes = Object.groupBy(
//   ROUTE_CONFIGS, ({handle}: AppRouteObject) => handle?.domain?.toSorted()?.join('__')
// ) as TStructRoute;

type StructuredRoutes = Record<TStructRoute, AppRouteObject[]>;


export const structuredRoutes = ROUTE_CONFIGS.reduce((acc, route) => {
  const key = route.handle.domain.toSorted().join('__') as TStructRoute;

  if (!acc[key]) {
    acc[key] = [];
  }

  acc[key].push(route);

  return acc;
}, {} as StructuredRoutes);

const dKeys = Object.keys(AUTH_DOMAINS)
const menuKeys = Object.keys(AVAILABLE_MENUS)

export const structuredMenu: StructuredMenu = {};

for (const domainKey of dKeys) {
  const domain = AUTH_DOMAINS[domainKey as keyof typeof AUTH_DOMAINS];
  structuredMenu[domain] = {};

  for (const menuKey of menuKeys) {
    const menu = AVAILABLE_MENUS[menuKey as keyof typeof AVAILABLE_MENUS];

    structuredMenu[domain]![menu] = ROUTE_CONFIGS
      .filter(({ handle }) =>
        handle.domain.includes(domain) &&
        handle.menu.includes(menu)
      )
      .map(({ path, handle }) => ({ path, handle }));
  }
}

export const ROUTES = ROUTE_CONFIGS.reduce((acc, { handle, path }) => {
  acc[handle.key] = path;
  return acc;
}, {} as Record<RouteHandle['key'], string>);
