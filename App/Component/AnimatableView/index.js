import React, { Component } from 'react';
import { View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { Enviroment } from '~/Theme';
import PropTypes from 'prop-types';

class AnimatedView extends Component {
  render() {
    const { children, ...others } = this.props;
    if (Enviroment.isDebuggingEnabled) {
      return (
        <View {...others}>
          {children}
        </View>
      );
    }
    return (
      <AnimatableView {...others}>
        {children}
      </AnimatableView>
    );
  }
}

AnimatedView.propTypes = {
  children: PropTypes.any,
};

export default AnimatedView;
