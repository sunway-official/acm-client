import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from './styles';
import { Colors } from 'Theme';
import GET_ATTENDEES_STATISTIC from 'Graphql/query/getTopicsStatistic.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class TopicsStatisticScene extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return TopicsStatisticScene._renderLoading();
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <ChartComponent
            data={this.props.data.getTopicsStatistic}
            pieChartDescription={'The percentage of best topics'}
            barChartDescription={'The number of best topics'}
          />
        </ScrollView>
      </View>
    );
  }
}

TopicsStatisticScene.header = {
  leftIcon: 'back',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

TopicsStatisticScene.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC)))(
  TopicsStatisticScene,
);
