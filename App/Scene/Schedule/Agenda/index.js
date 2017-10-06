import React from 'react';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { Colors, Metrics } from '~/Theme';
import Detail from './List';
import Fixture from '../fixture';
import { navigate } from '~/Redux/Navigation/action';

const tabs = {};
Fixture.map((schedule, index) => {
  const key = 'Day ' + (index + 1);
  const { activities, date } = schedule;
  tabs = {
    ...tabs,
    [key]: {
      screen: () => <Detail detail={activities} />,
      navigationOptions: { tabBarLabel: date },
    },
  };
});

const TabsView = TabNavigator(tabs, {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    scrollEnabled: true,
    indicatorStyle: {
      backgroundColor: Colors.white,
    },
    style: {
      backgroundColor: Colors.primary,
    },
    labelStyle: {
      margin: Metrics.smallMargin,
      color: Colors.white,
    },
    upperCaseLabel: false,
  },
});

TabsView.header = {
  theme: 'dark',
  actions: [
    {
      icon: {
        name: 'calendar-today',
        type: 'material-community',
      },
      onPress: dispatch => dispatch(navigate({ routeName: 'myAgenda' })),
    },
  ],
};
TabsView.drawer = {
  primary: true,
};

export default TabsView;
