import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '~/Theme';
import { Text, TouchableView } from '~/Component';
import { connect } from 'react-redux';
import { navigate } from '~/Redux/Navigation/action';
import List from './List';
import styles from './styles';
import { graphql, gql, compose } from 'react-apollo';
import query from '~/Graphql/query/getMyAgenda.graphql';
import transformer from '~/Transformer/schedules/myAgenda';

class MyAgenda extends Component {
  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  render() {
    const {
      data: { loading, getAllPersonalSchedules },
      goToAgenda,
    } = this.props;
    return loading ? (
      this._renderLoading()
    ) : (
      <View style={styles.container}>
        {getAllPersonalSchedules.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.warningText}>You have no schedules</Text>
            <TouchableView
              onPress={goToAgenda}
              style={styles.gotoBtn}
              rippleColor={Colors.white}
            >
              <Text style={styles.goToText}>Go to Agenda</Text>
            </TouchableView>
          </View>
        ) : (
          <List
            data={transformer(getAllPersonalSchedules, 'start', 'schedule')}
          />
        )}
      </View>
    );
  }
}

MyAgenda.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    getAllPersonalSchedules: PropTypes.array,
  }),
  goToAgenda: PropTypes.func,
};

MyAgenda.header = {
  theme: 'dark',
  statusBarBackgroundColor: Colors.primary,
  actions: [
    {
      icon: {
        name: 'calendar-range',
        type: 'material-community',
      },
      onPress: dispatch => dispatch(navigate({ routeName: 'agenda' })),
    },
  ],
};

MyAgenda.footer = {
  show: true,
  activeColor: Colors.primary,
};

const mapDispatchToProps = dispatch => ({
  goToAgenda: () => dispatch(navigate({ routeName: 'agenda' })),
});

export default compose(
  graphql(gql(query), {
    options: {
      notifyOnNetworkStatusChange: true,
    },
  }),
  connect(undefined, mapDispatchToProps),
)(MyAgenda);
