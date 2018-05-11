import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from './styles';
import { Colors } from 'Theme';
import GET_ATTENDEES_STATISTIC_BY_POSITION from 'Graphql/query/getAttendeesStatisticByPosition.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class AttendeesByPosition extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return AttendeesByPosition._renderLoading();
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <ChartComponent
            data={this.props.data.getAttendeesStatisticByPosition}
            pieChartDescription={
              'The percentage of attendees based on their positions'
            }
            barChartDescription={
              'The number of attendees based on their positions'
            }
            pie
          />
        </ScrollView>
      </View>
    );
  }
}

AttendeesByPosition.header = {
  leftIcon: 'back',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

AttendeesByPosition.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_POSITION)))(
  AttendeesByPosition,
);
