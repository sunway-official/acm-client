import Home from '../Scene/Home';
import Login from '../Scene/Login';

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
