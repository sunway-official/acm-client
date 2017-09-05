import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Toolbar } from 'react-native-material-design';

import styles from './styles';

class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          style={styles.header}
          title="Home"
          icon="menu"
          onIconPress={() => {}}
          actions={[{ icon: 'archive' }]}
        />
        <View style={styles.container}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default Wrapper;

export const wrapHeader = Scene => {
  return () =>
    <Wrapper>
      <Scene />
    </Wrapper>;
};
