import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from './styles';
import { Colors } from 'Theme';
import GET_ATTENDEES_STATISTIC_BY_LIKES from 'Graphql/query/getAttendeesStatisticByLikes.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class TopLikedUsers extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return TopLikedUsers._renderLoading();
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <ChartComponent
            data={this.props.data.getAttendeesStatisticByLikes}
            pieChartDescription={'The percentage of attendees based on likes'}
            barChartDescription={'The top of attendees based on likes'}
            bar
          />
        </ScrollView>
      </View>
    );
  }
}

TopLikedUsers.header = {
  leftIcon: 'back',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

TopLikedUsers.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_LIKES)))(
  TopLikedUsers,
);
