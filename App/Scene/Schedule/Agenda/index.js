import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { gql, graphql, compose } from 'react-apollo';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { KEY as NAVIGATION_KEY } from 'Reduck/Navigation';
import { reset } from 'Reduck/Navigation/action';
import { connect } from 'react-redux';
import { KEY, setModalState } from 'Reduck/Modal';
import { Colors, Metrics } from 'Theme';
import { FilterModal, LoadingIndicator, EmptyCollection } from 'Component';
import Detail from './List';
import transformer from 'Transformer/schedules/agenda';
import { transformServerDate } from 'Transformer';
import AGENDA_QUERY from 'Graphql/query/getAgenda.graphql';
import CURRENT_CONFERENCE_QUERY from 'Graphql/query/getCurrentConference.graphql';
import {
  formatDateToNumber,
  compareWithCurrentTime,
  compareWithCurrentDate,
} from 'Transformer/schedules/dateComparison';
import styles from './styles';

const TABS_CONFIG = {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    scrollEnabled: true,
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.black,
    indicatorStyle: {
      backgroundColor: Colors.primary,
      height: 2,
    },
    style: {
      backgroundColor: Colors.white,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.075)',
    },
    labelStyle: {
      margin: Metrics.smallMargin,
    },
    upperCaseLabel: false,
  },
};

class Agenda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastNavigationIndex: 0,
      topicIDs: [],
    };

    this._handleFilter = this._handleFilter.bind(this);
  }

  componentWillReceiveProps({ navigationIndex }) {
    if (navigationIndex !== this.props.sceneIndex) {
      this.setState({
        lastNavigationIndex: navigationIndex,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.lastNavigationIndex !== this.state.lastNavigationIndex) {
      return false;
    }
    if (nextProps.sceneIndex !== this.props.sceneIndex) {
      return false;
    }
    if (nextProps.selectedTopics !== this.props.selectedTopics) {
      return false;
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    const { sceneIndex } = this.props;
    if (
      nextState.lastNavigationIndex !== sceneIndex &&
      nextProps.navigationIndex === sceneIndex
    ) {
      this.setState({ lastNavigationIndex: nextProps.navigationIndex });
    }
  }

  _handleFilter = async () => {
    const { selectedTopics } = this.props;

    this.props.agenda.refetch({
      topics: selectedTopics.map(({ id }) => id),
    });
    this.props.hideFilterModal();
  };

  _renderFilter = isOpen => {
    const { currentConference: { getCurrentConference, loading } } = this.props;

    return (
      <FilterModal
        isVisible={isOpen}
        contents={loading ? [] : getCurrentConference.topics}
        onBackdropPress={() => this.props.hideFilterModal()}
        onCancelPress={() => this.props.hideFilterModal()}
        onApplyPress={() => this._handleFilter()}
      />
    );
  };

  /**
   * Check current date is in between the first date of schedule and the last date of schedule or not
   */
  _checkExistedCurrentDateInPeriodTimeOfConference(schedules) {
    // 2 cases:
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

  _renderTabs(getAgenda) {
    const schedules = transformer(getAgenda, 'start');
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
        <EmptyCollection emptyText="There is no schedules" />
      </View>
    );
  }

  render() {
    const { agenda: { loading, getAgenda } } = this.props;
    const isFilterOpen = this.props.modal.isOpen;
    let Tabs;
    if (loading) {
      Tabs = this._renderLoading();
    } else {
      Tabs =
        getAgenda.length === 0
          ? this._renderEmptySchedules()
          : this._renderTabs(getAgenda);
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
  leftIcon: 'back',
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

Agenda.propTypes = {
  showFilterModal: PropTypes.func,
  hideFilterModal: PropTypes.func,
  modal: PropTypes.object,
  sceneIndex: PropTypes.number,
  navigationIndex: PropTypes.number,
  agenda: PropTypes.shape({
    getAgenda: PropTypes.array,
    loading: PropTypes.bool,
    refetch: PropTypes.func,
  }),
  currentConference: PropTypes.shape({
    getCurrentConference: PropTypes.object,
    loading: PropTypes.bool,
    refetch: PropTypes.func,
  }),
  selectedTopics: PropTypes.array,
};

const mapStateToProps = state => {
  let sceneIndex = 0;
  state[NAVIGATION_KEY].routes.map(({ routeName }, index) => {
    if (routeName === 'agenda') {
      sceneIndex = index;
    }
  });
  return {
    modal: state[KEY],
    sceneIndex,
    navigationIndex: state[NAVIGATION_KEY].index,
    selectedTopics: state.filter.selectedTopics,
  };
};

const mapDispatchToProps = dispatch => ({
  showFilterModal: () => dispatch(setModalState(true)),
  hideFilterModal: () => dispatch(setModalState(false)),
});

export default compose(
  graphql(gql(AGENDA_QUERY), {
    name: 'agenda',
    options: {
      variables: {
        topics: [],
      },
      notifyOnNetworkStatusChange: true,
    },
  }),
  graphql(gql(CURRENT_CONFERENCE_QUERY), {
    name: 'currentConference',
    options: {
      notifyOnNetworkStatusChange: true,
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(Agenda);
