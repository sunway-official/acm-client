import Home from '../Screen/Home';

export const AppRoutes = {
  Home: {
    path: '/',
    screen: Home,
  },
};

export const INITIAL_ROUTE_NAME = 'Home';

export const DrawerRoutes = [
  {
    name: 'Home',
    icon: {
      name: 'home',
      type: 'material-community',
    },
  },
];
