import Home from '../Scene/Home';
import Login from '../Scene/Login';

export const AppRoutes = {
  home: {
    name: 'Home',
    path: '/',
    scene: Home,
  },
  login: {
    name: 'Login',
    path: '/login',
    scene: Login,
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
