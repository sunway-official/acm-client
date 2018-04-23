import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator, PieChart } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from './styles';
import { Colors } from 'Theme';
import GET_ATTENDEES_STATISTIC from 'Graphql/query/getAttendeesStatistic.graphql';

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

class AttendeesStatisticScene extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  filteredList = data => {
    return data.map(item => {
      return {
        x: item.key,
        y: item.percentage,
        label: `${item.label}\n(${item.value} people)`,
      };
    });
  };

  render() {
    if (this.props.data.loading) {
      return AttendeesStatisticScene._renderLoading();
    }

    return (
      <View style={styles.container}>
        <View style={styles.chart}>
          <PieChart
            data={this.filteredList(this.props.data.getAttendeesStatistic)}
            description={'The number of attendees based on organizer'}
            colorScale={color}
            labelRadius={72}
          />
        </View>
      </View>
    );
  }
}

AttendeesStatisticScene.header = {
  leftIcon: 'back',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

AttendeesStatisticScene.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC)))(
  AttendeesStatisticScene,
);
