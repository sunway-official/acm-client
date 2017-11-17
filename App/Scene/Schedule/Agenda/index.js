import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { gql, graphql, compose } from 'react-apollo';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { reset } from '~/Redux/Navigation/action';
import { connect } from 'react-redux';
import { KEY, setModalState } from '~/Redux/Modal';
import { Colors, Metrics } from '~/Theme';
import { FilterModal, LoadingIndicator } from '~/Component';
import Detail from './List';
import transformer from '~/Transformer/schedules/agenda';
import { transformServerDate } from '~/Transformer';
import AGENDA_QUERY from '~/Graphql/query/getAgenda.graphql';
import {
  timeComparison,
  dateComparison,
} from '~/Transformer/schedules/dateComparison';
import moment from 'moment';
import { DATE_FORMAT } from '~/env';
import styles from './styles';

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
    agenda: PropTypes.shape({
      getAllSchedules: PropTypes.array,
      loading: PropTypes.bool,
      refetch: PropTypes.func,
    }),
  };

  componentWillMount() {
    this.props.agenda.refetch();
  }

  _renderFilter = isOpen => (
    <FilterModal
      isVisible={isOpen}
      onBackdropPress={() => this.props.hideFilterModal()}
      onCancelPress={() => this.props.hideFilterModal()}
    />
  );

  _renderTabs() {
    const { agenda: { getAllSchedules } } = this.props;
    const schedules = transformer(getAllSchedules, 'start');
    let tabs = {};

    schedules.map(schedule => {
      const { activities, date } = schedule;
      const tabName = transformServerDate.toLocal(date);
      const comparison = dateComparison(schedule.date);
      if (comparison === -1) {
        activities.map(activity => {
          activity.isBefore = true;
        });
      }
      tabs = {
        ...tabs,
        [tabName]: {
          screen: () => (
            <Detail
              detail={
                comparison === 0 ? timeComparison(activities) : activities
              }
            />
          ),
          navigationOptions: {
            tabBarLabel: transformServerDate.toLocal(date),
          },
        },
      };
    });
    return TabNavigator(tabs, {
      ...TABS_CONFIG,
      initialRouteName: moment().format(DATE_FORMAT),
    });
  }

  _renderLoading() {
    return () => (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    const { agenda: { loading } } = this.props;
    const isFilterOpen = this.props.modal.isOpen;
    const Tabs = loading ? this._renderLoading() : this._renderTabs();
    return (
      <View style={styles.container}>
        {this._renderFilter(isFilterOpen)}
        <Tabs />
      </View>
    );
  }
}

Agenda.header = {
  theme: 'dark',
  statusBarBackgroundColor: Colors.primary,
  actions: [
    {
      icon: {
        name: 'calendar-today',
        type: 'material-community',
      },
      onPress: dispatch => dispatch(reset({ routeName: 'myAgenda' })),
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
  graphql(gql(AGENDA_QUERY), {
    name: 'agenda',
    options: {
      notifyOnNetworkStatusChange: true,
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(Agenda);
