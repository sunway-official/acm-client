import Home from '../Scene/Home';
import Login from '../Scene/Login';
import Schedule from '../Scene/Schedule';

const routes = {
  home: {
    name: 'Home',
    path: '/',
    screen: Home,
    initial: true,
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
    scene: Schedule,
    initial: true,
  },
};

const getInitialRoute = () => {
  let route = {};
  Object.keys(routes).map(key => {
    if (routes[key].initial === true) {
      route = key;
    }
  });
  return route;
};

export const config = {
  navigationOptions: {},
  initialRouteName: getInitialRoute(),
};

export default routes;
