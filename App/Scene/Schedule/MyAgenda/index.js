import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '~/Theme';
import { navigate } from '~/Redux/Navigation/action';
import List from './List';
import styles from './styles';
import { graphql, gql } from 'react-apollo';
import query from '~/Graphql/query/getMyAgenda.graphql';
import transformer from './transformer';

const renderLoading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator />
  </View>
);

const MyAgenda = ({ data: { loading, getAllPersonalSchedules } }) => {
  return loading ? (
    renderLoading()
  ) : (
    <View style={styles.container}>
      <List data={transformer(getAllPersonalSchedules, 'start', 'schedule')} />
    </View>
  );
};

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

export default graphql(gql(query))(MyAgenda);
