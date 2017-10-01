import React, { Component } from 'react';
import { View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { Enviroment } from '~/Theme';
import PropTypes from 'prop-types';

class AnimatedView extends Component {
  render() {
    const { children, viewRef, ...others } = this.props;
    if (Enviroment.isDebuggingEnabled) {
      return (
        <View {...others}>
          {children}
        </View>
      );
    }
    return (
      <AnimatableView {...others} ref={viewRef}>
        {children}
      </AnimatableView>
    );
  }
}

AnimatedView.propTypes = {
  children: PropTypes.any,
  viewRef: PropTypes.func,
};

export default AnimatedView;
