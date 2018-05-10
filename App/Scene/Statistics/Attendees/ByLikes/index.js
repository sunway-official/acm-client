import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from '../styles';
import GET_ATTENDEES_STATISTIC_BY_LIKES from 'Graphql/query/getAttendeesStatisticByLikes.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class AttendeesStatisticByLikes extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return AttendeesStatisticByLikes._renderLoading();
    }

    return (
      <ChartComponent
        data={this.props.data.getAttendeesStatisticByLikes}
        pieChartDescription={'The percentage of attendees based on likes'}
        barChartDescription={'The number of attendees based on likes'}
        bar
      />
    );
  }
}

AttendeesStatisticByLikes.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_LIKES)))(
  AttendeesStatisticByLikes,
);
