import React, { PureComponent } from 'react';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { Colors, Metrics } from '~/Theme';
import Detail from '../Detail/Agenda';
import Fixture from '../fixture';

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
      backgroundColor: 'black',
    },
    style: {
      backgroundColor: 'transparent',
      marginBottom: Metrics.smallMargin,
    },
    labelStyle: { margin: 0, color: Colors.black },
    upperCaseLabel: false,
  },
});

class Agenda extends PureComponent {
  static propTypes = {};
  render() {
    return <TabsView />;
  }
}

export default Agenda;
