import Home from 'Scene/Home';
import Login from 'Scene/Auth/Login';
import ForgotPassword from 'Scene/Auth/ForgotPassword/';
import Register from 'Scene/Auth/Register';
import { NewsFeed, NewsPosting, NewsDetail } from 'Scene/News';
import Notification from 'Scene/Notification';
import People from 'Scene/People';
import Profile from 'Scene/Profile';
import ProfileEditing from 'Scene/Profile/ProfileEditing';
import ChangePassword from 'Scene/Profile/ChangePassword';
import Setting from 'Scene/Setting';
import { Agenda, MyAgenda, ActivityDetail } from 'Scene/Schedule';
import Splash from 'Scene/Splash';
import {
  ConferenceLocation,
  ConferenceList,
  ConferenceDetail,
} from 'Scene/Conference';
import PapersTracker from 'Scene/PapersTracker';
import Statistics from 'Scene/Statistics';
import AttendeesStatisticScene from 'Scene/Statistics/Attendees';
import TopicsStatisticScene from 'Scene/Statistics/Topics';
import PapersStatisticScene from 'Scene/Statistics/Papers';
import TopCommentUsersScene from 'Scene/Statistics/TopCommentUsers';

export const ROUTES = {
  splash: {
    name: 'Splash',
    path: '/splash',
    screen: Splash,
    icon: {
      name: 'home',
    },
  },
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
  register: {
    name: 'Register',
    path: '/register',
    screen: Register,
    icon: {
      name: 'login-variant',
      type: 'material-community',
    },
  },
  newsFeed: {
    name: 'News Feed',
    path: '/news-feed',
    screen: NewsFeed,
    icon: {
      name: 'newspaper',
      type: 'material-community',
    },
  },
  newsPosting: {
    name: 'New Post',
    path: '/news-feed/post',
    screen: NewsPosting,
    icon: {
      name: 'newspaper',
      type: 'material-community',
    },
  },
  newsDetail: {
    name: 'New Detail',
    path: '/news-feed/detail',
    screen: NewsDetail,
    icon: {
      name: 'newspaper',
      type: 'material-community',
    },
  },
  myAgenda: {
    name: 'My Agenda',
    path: '/my-agenda',
    screen: MyAgenda,
    icon: {
      name: 'calendar-today',
      type: 'material-community',
    },
    activeIcon: {
      name: 'calendar-text',
      type: 'material-community',
    },
  },
  agenda: {
    name: 'Agenda',
    path: '/agenda',
    screen: Agenda,
    icon: {
      name: 'calendar-range',
      type: 'material-community',
    },
  },
  activityDetail: {
    name: 'Activity Detail',
    path: '/activity-detail',
    screen: ActivityDetail,
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
    // initial: true,
  },
  profileEditing: {
    name: 'Edit Profile',
    path: '/profile/edit',
    screen: ProfileEditing,
    icon: {
      name: 'face-profile',
      type: 'material-community',
    },
  },
  changePassword: {
    name: 'Change Password',
    path: '/change-password',
    screen: ChangePassword,
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
    activeIcon: {
      name: 'notifications',
    },
  },
  conferenceLocation: {
    name: 'Location',
    path: '/conference/location',
    screen: ConferenceLocation,
    icon: {
      name: 'google-maps',
      type: 'material-community',
    },
  },
  conferenceList: {
    name: 'Conferences',
    path: '/conference/list',
    screen: ConferenceList,
    icon: {
      name: 'apps',
      type: 'material-community',
    },
  },
  conferenceDetail: {
    name: 'Conference Detail',
    path: '/conference/detail',
    screen: ConferenceDetail,
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
  papersTracker: {
    name: 'Papers Tracker',
    path: '/papersTracker',
    screen: PapersTracker,
    icon: {
      name: 'ios-paper',
      type: 'ionicon',
    },
  },
  statistics: {
    name: 'Statistics',
    path: '/statistics',
    screen: Statistics,
    icon: {
      name: 'chart-bar',
      type: 'material-community',
    },
    initial: true,
  },
  attendeesStatistic: {
    name: 'Attendees Statistics',
    path: '/statistics/attendees',
    screen: AttendeesStatisticScene,
    icon: {
      name: 'chart-bar',
      type: 'material-community',
    },
  },
  topicsStatistic: {
    name: 'Topics Statistic',
    path: '/statistics/topics',
    screen: TopicsStatisticScene,
    icon: {
      name: 'chart-bar',
      type: 'material-community',
    },
  },
  papersStatistic: {
    name: 'Papers Statistic',
    path: '/statistics/papers',
    screen: PapersStatisticScene,
    icon: {
      name: 'chart-bar',
      type: 'material-community',
    },
  },
  topCommentUsersStatistic: {
    name: 'Top comment users - Statistic',
    path: '/statistics/topCommentUsersStatistic',
    screen: TopCommentUsersScene,
    icon: {
      name: 'chart-bar',
      type: 'material-community',
    },
  },
};

export const config = {
  navigationOptions: {
    header: null,
    gesturesEnabled: false,
  },
  cardStyle: {
    shadowOpacity: 0,
  },
};

export default {
  ROUTES,
  config,
};
