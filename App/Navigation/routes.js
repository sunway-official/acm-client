import Home from '~/Scene/Home';
import Login from '~/Scene/Auth/LoginForm';
import ForgotPassword from '~/Scene/Auth/ForgotPasswordForm';
import NewsFeed from '~/Scene/NewsFeed';
import Notification from '~/Scene/Notification';
import People from '~/Scene/People';
import Profile from '~/Scene/Profile';
import Setting from '~/Scene/Setting';
import Schedule from '~/Scene/Schedule';

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
      name: 'login-variant',
      type: 'material-community',
    },
    initial: true,
  },
  forgot: {
    name: 'Forgot Password',
    path: '/forgot-password',
    screen: ForgotPassword,
    // drawer: true,
    icon: {
      name: 'login-variant',
      type: 'material-community',
    },
  },
  setting: {
    name: 'Setting',
    path: '/setting',
    screen: Setting,
    secondaryDrawer: true,
    icon: {
      name: 'settings',
      type: 'material-community',
    },
  },
  'news-feed': {
    name: 'News Feed',
    path: '/news-feed',
    screen: NewsFeed,
    // initial: true,
    icon: {
      name: 'newspaper',
      type: 'material-community',
    },
  },
  schedule: {
    name: 'Schedule',
    path: '/schedule',
    screen: Schedule,
    icon: {
      name: 'calendar',
      type: 'material-community',
    },
  },
  people: {
    name: 'People',
    path: '/people',
    screen: People,
    icon: {
      name: 'people',
      type: 'simple-line-icon',
    },
  },
  profile: {
    name: 'Profile',
    path: '/profile',
    screen: Profile,
    icon: {
      name: 'face-profile',
      type: 'material-community',
    },
  },
  notification: {
    name: 'Notification',
    path: '/notification',
    screen: Notification,
    icon: {
      name: 'notifications-none',
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
    footer: route.screen.footer,
  };
  routes = {
    ...routes,
    [key]: route,
  };
});

export default routes;
