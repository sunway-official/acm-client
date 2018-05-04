import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from '../styles';
import GET_ATTENDEES_STATISTIC_BY_POSITION from 'Graphql/query/getAttendeesStatisticByPosition.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class AttendeesStatisticByPosition extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return AttendeesStatisticByPosition._renderLoading();
    }

    return (
      <ChartComponent
        data={this.props.data.getAttendeesStatisticByPosition}
        description={'The percentage of attendees based on their positions'}
        unitLabel={'people'}
      />
    );
  }
}

AttendeesStatisticByPosition.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_POSITION)))(
  AttendeesStatisticByPosition,
);
