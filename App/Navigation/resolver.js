import { ROUTES, config } from './routes';
import withFadeIn from '~/Container/withFadeIn';

export const getInitialRoute = () => {
  let route = {};
  Object.keys(ROUTES).map(key => {
    if (ROUTES[key].initial === true) {
      route = key;
    }
  });
  return route;
};

export const generateConfig = () => ({
  ...config,
  initialRouteName: 'splash',
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

    // Wrap fade in animation for tab scene
    if (route.footer && route.footer.show) {
      route.screen = withFadeIn(route.screen);
    }

    routes = {
      ...routes,
      [key]: route,
    };
  });
  return routes;
};
