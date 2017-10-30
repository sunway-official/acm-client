import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Colors } from '~/Theme';
import { LoadingIndicator } from '~/Component';
import { navigate } from '~/Redux/Navigation/action';
import { graphql, gql } from 'react-apollo';
import query from '~/Graphql/query/getMyAgenda.graphql';
import transformer from '~/Transformer/schedules/myAgenda';
import List from './List';
import styles from './styles';

class MyAgenda extends Component {
  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    const { data: { loading, getAllPersonalSchedules } } = this.props;
    return loading ? (
      this._renderLoading()
    ) : (
      <View style={styles.container}>
        <List
          data={transformer(getAllPersonalSchedules, 'start', 'schedule')}
        />
      </View>
    );
  }
}

MyAgenda.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    getAllPersonalSchedules: PropTypes.array,
  }),
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

export default graphql(gql(query), {
  options: {
    notifyOnNetworkStatusChange: true,
  },
})(MyAgenda);
