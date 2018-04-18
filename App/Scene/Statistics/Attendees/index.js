import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from './styles';
import { Metrics, Colors } from 'Theme';
import GET_ATTENDEES_STATISTIC from 'Graphql/query/getAttendeesStatistic.graphql';
import Pie from '../Pie';

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

  render() {
    if (this.props.data.loading) {
      return AttendeesStatisticScene._renderLoading();
    }

    const data = this.props.data.getAttendeesStatistic.map(item => {
      return {
        x: item.key,
        y: item.percentage,
        label: `${item.label}\n(${item.value} people)`,
      };
    });

    return <Pie data={data} colorScale={color} />;
  }
}

AttendeesStatisticScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

AttendeesStatisticScene.footer = {
  activeColor: Colors.primary,
  show: true,
};

AttendeesStatisticScene.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC)))(
  AttendeesStatisticScene,
);
