import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from '../styles';
import GET_ATTENDEES_STATISTIC_BY_THEIR_INTERESTING from 'Graphql/query/getAttendeesStatisticByTheirInteresting.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class AttendeesStatisticByInteresting extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return AttendeesStatisticByInteresting._renderLoading();
    }

    const filteredList = this.props.data.getAttendeesStatisticByTheirInteresting.slice(
      0,
      5,
    );

    return (
      <ChartComponent
        data={filteredList}
        pieChartDescription={
          'The percentage of attendees based on their interesting'
        }
        barChartDescription={
          'The number of attendees based on their interesting'
        }
        pie
      />
    );
  }
}

AttendeesStatisticByInteresting.propTypes = {
  data: PropTypes.object,
};

export default compose(
  graphql(gql(GET_ATTENDEES_STATISTIC_BY_THEIR_INTERESTING)),
)(AttendeesStatisticByInteresting);
