import Home from '../Scene/Home';
import Login from '../Scene/Login';
import Schedule from '../Scene/Schedule';

const ROUTES = {
  home: {
    name: 'Home',
    path: '/',
    screen: Home,
    drawer: true,
    icon: {
      name: 'home',
    },
  },
  login: {
    name: 'Login',
    path: '/login',
    screen: Login,
    drawer: true,
    icon: {
      name: 'login',
      type: 'material-community',
    },
  },
  schedule: {
    name: 'Schedule',
    path: '/schedule',
    screen: Schedule,
    initial: true,
  },
};

const getInitialRoute = () => {
  let route = {};
  Object.keys(ROUTES).map(key => {
    if (ROUTES[key].initial === true) {
      route = key;
    }
  });
  return route;
};

export const config = {
  navigationOptions: {},
  initialRouteName: getInitialRoute(),
};

let routes = {};

Object.keys(ROUTES).map(key => {
  let route = ROUTES[key];
  route.screen.navigationOptions = {
    ...route.screen.navigationOptions,
    title: route.name,
  };
  routes = {
    ...routes,
    [key]: route,
  };
});

console.log(routes);

export default ROUTES;
