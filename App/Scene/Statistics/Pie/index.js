import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, LoadingIndicator } from 'Component';
import { compose } from 'react-apollo';
import styles from './styles';
import { Metrics, Colors } from 'Theme';
import { VictoryPie } from 'victory-native';

const data = [
  { x: 1, y: 2, label: 'one' },
  { x: 2, y: 3, label: 'two' },
  { x: 3, y: 5, label: 'three' },
];

class PieChartScene extends Component {
  constructor(props) {
    super(props);
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    return (
      <VictoryPie
        events={[
          {
            target: 'data',
            eventHandlers: {},
          },
        ]}
        data={data}
      />
    );
  }
}

PieChartScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

PieChartScene.footer = {
  activeColor: Colors.primary,
  show: true,
};

PieChartScene.propTypes = {
  data: PropTypes.object,
};

export default PieChartScene;
