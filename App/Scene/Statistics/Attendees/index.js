import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { LoadingIndicator } from 'Component';
import styles from './styles';
import { Colors } from 'Theme';

import AttendeesStatisticByOrganization from './ByOrganization';
import AttendeesStatisticByInteresting from './ByInteresting';
import AttendeesStatisticByLanguage from './ByLanguage';
import AttendeesStatisticByPosition from './ByPosition';

class AttendeesStatisticScene extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <AttendeesStatisticByOrganization />
          <AttendeesStatisticByInteresting />
          <AttendeesStatisticByLanguage />
          <AttendeesStatisticByPosition />
        </View>
      </ScrollView>
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
  statisticByOrganization: PropTypes.object,
};

export default AttendeesStatisticScene;
