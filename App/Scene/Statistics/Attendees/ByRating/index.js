import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from '../styles';
import GET_ATTENDEES_STATISTIC_BY_RATING from 'Graphql/query/getAttendeesStatisticByRating.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class AttendeesStatisticByRating extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return AttendeesStatisticByRating._renderLoading();
    }

    return (
      <ChartComponent
        data={this.props.data.getAttendeesStatisticByRating}
        pieChartDescription={'The percentage of attendees based on rating'}
        barChartDescription={'The number of attendees based on rating'}
        unitLabel={'people'}
      />
    );
  }
}

AttendeesStatisticByRating.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_RATING)))(
  AttendeesStatisticByRating,
);
