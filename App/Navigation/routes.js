import Home from '~/Scene/Home';
import Login from '~/Scene/Auth/Login';
import ForgotPassword from '~/Scene/Auth/ForgotPassword';
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
    icon: {
      name: 'home',
    },
  },
  login: {
    name: 'Login',
    path: '/login',
    screen: Login,
    icon: {
      name: 'login-variant',
      type: 'material-community',
    },
  },
  forgot: {
    name: 'Forgot Password',
    path: '/forgot-password',
    screen: ForgotPassword,
    icon: {
      name: 'login-variant',
      type: 'material-community',
    },
  },
  setting: {
    name: 'Setting',
    path: '/setting',
    screen: Setting,
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
      name: 'calendar-blank',
      type: 'material-community',
    },
    activeIcon: {
      name: 'calendar-text',
      type: 'material-community',
    },
  },
  people: {
    name: 'People',
    path: '/people',
    screen: People,
    icon: {
      name: 'people-outline',
    },
    activeIcon: {
      name: 'people',
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
    initial: true,
  },
  notification: {
    name: 'Notification',
    path: '/notification',
    screen: Notification,
    icon: {
      name: 'notifications-none',
    },
    activeIcon: {
      name: 'notifications',
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
    drawer: route.screen.drawer,
    header: route.screen.header,
    footer: route.screen.footer,
  };
  routes = {
    ...routes,
    [key]: route,
  };
});

export default routes;
