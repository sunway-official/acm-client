import Home from '../Scene/Home';
import Auth from '../Scene/Auth';

export const AppRoutes = {
  home: {
    name: 'Home',
    path: '/',
    scene: Home,
    // initial: true,
  },
  login: {
    name: 'Auth',
    path: '/auth',
    scene: Auth,
    initial: true,
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
