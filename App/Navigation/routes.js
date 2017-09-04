import Home from '../Scene/Home';
import Login from '../Scene/Login';

export const AppRoutes = {
  home: {
    name: 'Home',
    path: '/',
    scene: Home,
    initial: true,
    drawer: true,
    icon: {
      name: 'home',
    },
  },
  login: {
    name: 'Login',
    path: '/login',
    scene: Login,
    drawer: true,
    icon: {
      name: 'login',
      type: 'material-community',
    },
  },
};

export const DrawerRoutes = {
  Home: {
    icon: {
      name: 'home',
      type: 'material-community',
    },
  },
};
