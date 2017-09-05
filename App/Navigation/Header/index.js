import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import TouchableView from '../../Component/TouchableView';
import { Colors, Metrics } from '../../Theme';
import styles from './styles';

class Header extends Component {
  render() {
    const textStyles = {
      color: Colors.white,
    };
    const iconStyles = {
      color: Colors.white,
      size: Metrics.icons.small,
    };
    const touchableViewStyles = {
      borderless: true,
    };
    return (
      <View style={styles.header}>
        <View style={styles.leftWrapper}>
          <TouchableView style={styles.iconWrapper} {...touchableViewStyles}>
            <Icon name="menu" {...iconStyles} />
          </TouchableView>
        </View>
        <View style={styles.centerWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={[styles.title, textStyles]}>Schedule Management</Text>
          </View>
        </View>
        <View style={styles.rightWrapper}>
          <TouchableView
            {...touchableViewStyles}
            style={[styles.rightIconWrapper]}
          >
            <Icon name="music-video" {...iconStyles} />
          </TouchableView>
          <TouchableView
            {...touchableViewStyles}
            style={[styles.rightIconWrapper]}
          >
            <Icon name="notifications-none" {...iconStyles} />
          </TouchableView>
          <TouchableView
            {...touchableViewStyles}
            style={[styles.rightIconWrapper, styles.firstRightIcon]}
          >
            <Icon name="mode-edit" {...iconStyles} />
          </TouchableView>
        </View>
      </View>
    );
  }
}

Header.propTypes = {};

export default Header;
