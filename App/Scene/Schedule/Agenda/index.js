import React, { Component } from 'react';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { Colors, Metrics } from '~/Theme';
import Detail from '../Detail/Agenda';
import Fixture from '../fixture';
import { navigate } from '~/Redux/Navigation/action';

const tabs = {};
Fixture.map((schedule, index) => {
  let key = 'Day ' + (index + 1);
  tabs = {
    ...tabs,
    [key]: {
      screen: () => <Detail schedule={schedule} />,
      navigationOptions: { tabBarLabel: schedule.date },
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
      backgroundColor: Colors.black,
    },
    style: {
      backgroundColor: 'transparent',
      marginBottom: Metrics.smallMargin,
    },
    labelStyle: { margin: 0, color: Colors.black },
    upperCaseLabel: false,
  },
});

const Agenda = () => <TabsView />;

Agenda.header = {
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
Agenda.drawer = {
  primary: true,
};

export default Agenda;
