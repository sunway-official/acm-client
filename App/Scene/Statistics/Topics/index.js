import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator, PieChart, BarChart } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from './styles';
import { Colors } from 'Theme';
import GET_ATTENDEES_STATISTIC from 'Graphql/query/getTopicsStatistic.graphql';

const color = [
  'tomato',
  'orange',
  'gold',
  'cyan',
  'navy',
  'black',
  'green',
  'red',
];

class TopicsStatisticScene extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  filteredListToPieChart = data => {
    return data.map(item => {
      return {
        x: item.key,
        y: item.percentage,
        label: `(${item.value} topic)`,
      };
    });
  };

  filteredListToBarChart = data => {
    return data.map(item => {
      return {
        x: item.label,
        y: item.value,
      };
    });
  };

  render() {
    if (this.props.data.loading) {
      return TopicsStatisticScene._renderLoading();
    }

    return (
      <View style={styles.container}>
        <View style={styles.chart}>
          {this.props.data.length > 6 ? (
            <PieChart
              data={this.filteredListToPieChart(
                this.props.data.getTopicsStatistic,
              )}
              description={'The number of topics based on categories'}
              colorScale={color}
              labelRadius={95}
            />
          ) : (
            <BarChart
              data={this.filteredListToBarChart(
                this.props.data.getTopicsStatistic,
              )}
            />
          )}
        </View>
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
