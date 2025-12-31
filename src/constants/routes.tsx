import Home from "@pages/Home/Home";
import Login from "@pages/Login/Login";
import Registration from "@pages/Registration/Registration";
import Status from "@pages/Status/Status";

export const ROUTES = {
  LOGIN: {path: '/login', type: ['public'], element: <Login />, string: 'labels.login'},
  REGISTRATION: {path: '/registration', type: ['public'], element: <Registration />, string: 'labels.registration'},
  HOME: {path: '/', type: ['private'], element: <Home />, string: 'labels.home'},
  STATUS: {path: '/status', type: ['private'], element: <Status />, string: 'labels.status'},
} as const;

export const {publicRoutes, privateRoutes} = Object.groupBy(Object.keys(ROUTES), (x) => `${ROUTES[x].type}Routes`)
