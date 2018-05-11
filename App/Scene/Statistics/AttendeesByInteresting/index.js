import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from './styles';
import { Colors } from 'Theme';
import GET_ATTENDEES_STATISTIC_BY_THEIR_INTERESTING from 'Graphql/query/getAttendeesStatisticByTheirInteresting.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class AttendeesByOrganization extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return AttendeesByOrganization._renderLoading();
    }

    const filteredList = this.props.data.getAttendeesStatisticByTheirInteresting.slice(
      0,
      5,
    );

    return (
      <View style={styles.container}>
        <ScrollView>
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
        </ScrollView>
      </View>
    );
  }
}

AttendeesByOrganization.header = {
  leftIcon: 'back',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

AttendeesByOrganization.propTypes = {
  data: PropTypes.object,
};

export default compose(
  graphql(gql(GET_ATTENDEES_STATISTIC_BY_THEIR_INTERESTING)),
)(AttendeesByOrganization);
