import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Text, LoadingIndicator } from 'Component';
import { compose } from 'react-apollo';
import styles from './styles';
import { Metrics, Colors } from 'Theme';
import Bar from './Bar';
import Pie from './Pie';

// const closeIcon = {
//   type: 'material-community',
//   name: 'check-all',
//   color: Colors.black,
//   size: 20,
// };

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

class StatisticsScene extends Component {
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
      <View>
        <ScrollView style={styles.container}>
          <Text style={styles.text}>Demo statistics with Chart</Text>
          <Bar />
          <Pie />
        </ScrollView>
      </View>
    );
  }
}

StatisticsScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

StatisticsScene.footer = {
  activeColor: Colors.primary,
  show: true,
};

StatisticsScene.propTypes = {
  data: PropTypes.object,
};

export default StatisticsScene;
