import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { gql, graphql, compose } from 'react-apollo';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { navigate } from '~/Redux/Navigation/action';
import { connect } from 'react-redux';
import { KEY, setModalState } from '~/Redux/Modal';
import { Colors, Metrics } from '~/Theme';
import { FilterModal, LoadingIndicator } from '~/Component';
import Detail from './List';
import transformer from '~/Transformer/schedules/agenda';
import { transformServerDate } from '~/Transformer';
import transformExistedSchedule from '~/Transformer/schedules/existedSchedule';
import queryAgenda from '~/Graphql/query/getAgenda.graphql';
import queryMyAgenda from '~/Graphql/query/getMyAgenda.graphql';
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
      data: PropTypes.shape({
        getAllSchedules: PropTypes.array,
        loading: PropTypes.bool,
        refetch: PropTypes.func,
      }),
    }),
    myAgenda: PropTypes.shape({
      data: PropTypes.shape({
        refetch: PropTypes.func,
      }),
    }),
  };

  componentWillUnmount() {
    this.props.myAgenda.data.refetch();
  }

  _renderFilter = isOpen => (
    <FilterModal
      isVisible={isOpen}
      onBackdropPress={() => this.props.hideFilterModal()}
      onCancelPress={() => this.props.hideFilterModal()}
    />
  );

  _renderTabs() {
    const {
      agenda: { data: { getAllSchedules } },
      myAgenda: { data: { getAllPersonalSchedules } },
    } = this.props;
    const filteredSchedules = transformExistedSchedule(
      getAllSchedules,
      getAllPersonalSchedules,
      'existed',
    );
    const schedules = transformer(filteredSchedules, 'start');
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

  _renderLoading() {
    return () => (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    const { agenda: { data: { loading } } } = this.props;
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
  graphql(gql(queryAgenda), {
    props: ({ data, loading }) => ({
      agenda: { data, loading },
    }),
  }),
  graphql(gql(queryMyAgenda), {
    props: ({ data, loading }) => ({
      myAgenda: { data, loading },
    }),
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(Agenda);
