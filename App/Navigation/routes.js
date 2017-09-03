import Home from '../Scene/Home';
import Login from '../Scene/Login';
import Schedule from '../Scene/Schedule';

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
  },
  schedule: {
    name: 'Schedule',
    path: '/schedule',
    scene: Schedule,
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
