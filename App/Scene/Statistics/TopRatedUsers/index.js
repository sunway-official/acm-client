import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from './styles';
import { Colors } from 'Theme';
import GET_ATTENDEES_STATISTIC_BY_RATING from 'Graphql/query/getAttendeesStatisticByRating.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class TopRatedUsers extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return TopRatedUsers._renderLoading();
    }

    const filteredList = this.props.data.getAttendeesStatisticByRating.slice(
      0,
      10,
    );

    return (
      <View style={styles.container}>
        <ScrollView>
          <ChartComponent
            data={filteredList}
            pieChartDescription={'The percentage of attendees based on rating'}
            barChartDescription={'The top of attendees based on rating'}
            bar
          />
        </ScrollView>
      </View>
    );
  }
}

TopRatedUsers.header = {
  leftIcon: 'back',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

TopRatedUsers.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_RATING)))(
  TopRatedUsers,
);
