import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { gql, graphql, compose } from 'react-apollo';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { reset } from '~/Redux/Navigation/action';
import { connect } from 'react-redux';
import moment from 'moment';
import { KEY, setModalState } from '~/Redux/Modal';
import { Colors, Metrics } from '~/Theme';
import { FilterModal, LoadingIndicator, EmptyCollection } from '~/Component';
import Detail from './List';
import transformer from '~/Transformer/schedules/agenda';
import { transformServerDate } from '~/Transformer';
import AGENDA_QUERY from '~/Graphql/query/getAgenda.graphql';
import {
  formatDateToNumber,
  compareWithCurrentTime,
  compareWithCurrentDate,
} from '~/Transformer/schedules/dateComparison';
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

  /**
   * Check current date is in between the first date of schedule and the last date of schedule or not
   */
  _checkExistedCurrentDateInPeriodTimeOfConference(schedules) {
    // 2 case:
    // current date is before the first date of schedule (in the past)
    // current date is after the last date of schedule (in the future)
    if (
      compareWithCurrentDate(schedules[0].date) === 1 ||
      compareWithCurrentDate(schedules[schedules.length - 1].date) === -1
    ) {
      // not existed
      return false;
    }
    // existed
    return true;
  }

  /**
   * Get negative numbers, including 0
   * Special case: value is 0
   */
  _filterNegativeNumbers(arr) {
    let result = [];
    arr.map(item => {
      if (item.value <= 0) {
        result.push(item);
      }
    });
    return result;
  }

  /**
   * Get initial date if current date is in a period time (from the first date to the last date of the conference)
   */
  _getInitialDateInPeriodTimeOfConference(schedules) {
    const arr = schedules.map((schedule, index) => {
      const value = formatDateToNumber() - formatDateToNumber(schedule.date);
      return { index, value };
    });

    const negativeNumbers = this._filterNegativeNumbers(arr);
    return negativeNumbers[0];
  }

  _renderTabs(getAllSchedules) {
    const schedules = transformer(getAllSchedules, 'start');
    let tabs = {},
      initialDate = '';

    // Handle and set initial date for Tabs
    const firstDate = schedules[0].date,
      lastDate = schedules[schedules.length - 1].date;
    if (!this._checkExistedCurrentDateInPeriodTimeOfConference(schedules)) {
      // if current date is before the first date
      if (compareWithCurrentDate(firstDate) === 1) {
        initialDate = transformServerDate.toLocal(firstDate);
      }
      // if current date is after the first date
      if (compareWithCurrentDate(lastDate) === -1) {
        initialDate = transformServerDate.toLocal(lastDate);
      }
    } else {
      const { index } = this._getInitialDateInPeriodTimeOfConference(schedules);
      initialDate = transformServerDate.toLocal(schedules[index].date);
    }

    schedules.map(schedule => {
      const { activities, date } = schedule;
      const tabName = transformServerDate.toLocal(date);
      const comparison = compareWithCurrentDate(date);

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
                comparison === 0
                  ? compareWithCurrentTime(activities)
                  : activities
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
      initialRouteName: initialDate,
    });
  }

  _renderLoading() {
    return () => (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  _renderEmptySchedules() {
    return () => (
      <View style={styles.container}>
        <EmptyCollection />
      </View>
    );
  }

  render() {
    const { agenda: { loading, getAllSchedules } } = this.props;
    const isFilterOpen = this.props.modal.isOpen;
    let Tabs;
    if (loading) {
      Tabs = this._renderLoading();
    } else {
      Tabs =
        getAllSchedules.length === 0
          ? this._renderEmptySchedules()
          : this._renderTabs(getAllSchedules);
    }
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
