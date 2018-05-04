import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { LoadingIndicator } from 'Component';
import styles from './styles';
import { Colors } from 'Theme';

import PapersStatisticByReviews from './ByReviews';

class PapersStatisticScene extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <PapersStatisticByReviews />
        </ScrollView>
      </View>
    );
  }
}

PapersStatisticScene.header = {
  leftIcon: 'back',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

PapersStatisticScene.propTypes = {
  data: PropTypes.object,
  statisticByOrganization: PropTypes.object,
};

export default PapersStatisticScene;
