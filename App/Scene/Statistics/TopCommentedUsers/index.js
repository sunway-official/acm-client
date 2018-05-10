import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from './styles';
import { Colors } from 'Theme';
import GET_ATTENDEES_STATISTIC_BY_TOTAL_COMMENTS from 'Graphql/query/getAttendeesStatisticByTotalComments.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class TopCommentedUsers extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return TopCommentedUsers._renderLoading();
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <ChartComponent
            data={this.props.data.getAttendeesStatisticByTotalComments}
            pieChartDescription={
              'The percentage of attendees based on comments'
            }
            barChartDescription={'The top of attendees based on comments'}
            bar
          />
        </ScrollView>
      </View>
    );
  }
}

TopCommentedUsers.header = {
  leftIcon: 'back',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

TopCommentedUsers.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_TOTAL_COMMENTS)))(
  TopCommentedUsers,
);
