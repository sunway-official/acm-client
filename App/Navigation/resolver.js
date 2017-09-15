import { ROUTES, config } from './routes';

function getInitialRoute() {
  let route = {};
  Object.keys(ROUTES).map(key => {
    if (ROUTES[key].initial === true) {
      route = key;
    }
  });
  return route;
}

export const generateConfig = () => ({
  ...config,

  initialRouteName: getInitialRoute(),
});

export const generateRoutes = () => {
  let routes = {};

  Object.keys(ROUTES).map(key => {
    let route = ROUTES[key];
    route = {
      ...route,
      drawer: route.screen.drawer,
      header: route.screen.header,
      footer: route.screen.footer,
    };
    routes = {
      ...routes,
      [key]: route,
    };
  });
  return routes;
};
