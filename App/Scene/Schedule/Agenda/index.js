import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { gql, graphql, compose } from 'react-apollo';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { navigate } from '~/Redux/Navigation/action';
import { connect } from 'react-redux';
import { KEY, setModalState } from '~/Redux/Modal';
import { Colors, Metrics } from '~/Theme';
import FilterModal from '~/Component/FilterModal';
import Detail from './List';
import Fixture from '../fixture';
import query from '~/Graphql/query/getAgenda.graphql';
import transformer from '../transformer';
import { transformServerDate } from '~/Transformer';

const TABS_CONFIG = {
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
};

class Agenda extends Component {
  static propTypes = {
    showFilterModal: PropTypes.func,
    hideFilterModal: PropTypes.func,
    modal: PropTypes.object,
    data: PropTypes.shape({
      getAllSchedules: PropTypes.array,
      loading: PropTypes.bool,
    }),
  };

  _renderFilter = isOpen => (
    <FilterModal
      isVisible={isOpen}
      onBackdropPress={() => this.props.hideFilterModal()}
      onCancelPress={() => this.props.hideFilterModal()}
    />
  );

  _renderTabs() {
    const { data: { getAllSchedules, loading } } = this.props;
    const schedules = transformer(getAllSchedules, 'start');
    let tabs = {};

    schedules.map((schedule, index) => {
      const key = 'Day ' + (index + 1);
      const { activities, date } = schedule;
      tabs = {
        ...tabs,
        [key]: {
          screen: () => <Detail detail={activities} />,
          navigationOptions: {
            tabBarLabel: transformServerDate.toLocal(date),
          },
        },
      };
    });

    return TabNavigator(tabs, TABS_CONFIG);
  }

  render() {
    const { data: { loading } } = this.props;
    const isFilterOpen = this.props.modal.isOpen;
    // TO DO: Handle null
    const Tabs = loading
      ? () => (
          <View>
            <Text>Loading</Text>
          </View>
        )
      : this._renderTabs();
    return (
      <View style={{ flex: 1 }}>
        {this._renderFilter(isFilterOpen)}
        <Tabs />
      </View>
    );
  }
}

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

export default compose(
  graphql(gql(query)),
  connect(mapStateToProps, mapDispatchToProps),
)(Agenda);
