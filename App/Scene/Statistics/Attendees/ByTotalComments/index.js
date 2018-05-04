import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from '../styles';
import GET_ATTENDEES_STATISTIC_BY_TOTAL_COMMENTS from 'Graphql/query/getAttendeesStatisticByTotalComments.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class AttendeesStatisticByTotalComments extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return AttendeesStatisticByTotalComments._renderLoading();
    }

    return (
      <ChartComponent
        data={this.props.data.getAttendeesStatisticByTotalComments}
        description={'getAttendeesStatisticByTotalComments'}
        unitLabel={'people'}
      />
    );
  }
}

AttendeesStatisticByTotalComments.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_TOTAL_COMMENTS)))(
  AttendeesStatisticByTotalComments,
);
