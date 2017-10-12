import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { navigate } from '~/Redux/Navigation/action';
import { connect } from 'react-redux';
import { KEY, setModalState } from '~/Redux/Modal';

import { Colors, Metrics } from '~/Theme';
import FilterModal from '~/Component/FilterModal';
import Detail from './List';

import Fixture from '../fixture';

class Agenda extends Component {
  static propTypes = {
    showFilterModal: PropTypes.func,
    hideFilterModal: PropTypes.func,
    modal: PropTypes.object,
  };

  _renderFilter = isOpen =>
    <FilterModal
      isVisible={isOpen}
      onBackdropPress={() => this.props.hideFilterModal()}
      onCancelPress={() => this.props.hideFilterModal()}
    />;

  render() {
    const isFilterOpen = this.props.modal.isOpen;
    return (
      <View style={{ flex: 1 }}>
        {this._renderFilter(isFilterOpen)}
        <TabsView />
      </View>
    );
  }
}

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
    {
      icon: {
        name: 'filter',
        type: 'foundation',
      },
      onPress: dispatch => {
        dispatch(setModalState(true));
      },
    },
  ],
};
Agenda.drawer = {
  primary: true,
};

const mapStateToProps = state => ({
  modal: state[KEY],
});

const mapDispatchToProps = dispatch => ({
  showFilterModal: () => dispatch(setModalState(true)),
  hideFilterModal: () => dispatch(setModalState(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
