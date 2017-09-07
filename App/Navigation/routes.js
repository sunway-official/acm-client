import Home from '~/Scene/Home';
import Login from '~/Scene/Login';

import ForgotPassword from '../Component/Login/ForgotPasswordForm';

const ROUTES = {
  home: {
    name: 'Home',
    path: '/',
    screen: Home,
    // initial: true,
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
      name: 'login-variant',
      type: 'material-community',
    },
    initial: true,
  },
  forgot: {
    name: 'Forgot Password',
    path: '/forgot',
    screen: ForgotPassword,
    drawer: true,
    icon: {
      name: 'login-variant',
      type: 'material-community',
    },
  },
  setting: {
    name: 'Setting',
    path: '/setting',
    screen: Login,
    secondaryDrawer: true,
    icon: {
      name: 'settings',
      type: 'material-community',
    },
  },
};

export const config = {
  navigationOptions: {
    header: null,
  },
  initialRouteName: getInitialRoute(),
  cardStyle: {
    shadowOpacity: 0,
  },
};

function getInitialRoute() {
  let route = {};
  Object.keys(ROUTES).map(key => {
    if (ROUTES[key].initial === true) {
      route = key;
    }
  });
  return route;
}

let routes = {};

Object.keys(ROUTES).map(key => {
  let route = ROUTES[key];
  route = {
    ...route,
    header: route.screen.header,
  };
  routes = {
    ...routes,
    [key]: route,
  };
});

export default routes;
