import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
const IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21 && IS_ANDROID;

class TouchableView extends PureComponent {
  static propTypes = {
    isRippleDisabled: PropTypes.bool,
    rippleColor: PropTypes.string,
    borderless: PropTypes.bool,
    children: PropTypes.any,
    style: View.propTypes.style,
  };

  render() {
    const {
      isRippleDisabled,
      rippleColor = '#fff',
      borderless = false,
      children,
      style,
      ...props
    } = this.props;

    if (IS_RIPPLE_EFFECT_SUPPORTED && !isRippleDisabled) {
      const background = TouchableNativeFeedback.Ripple(
        rippleColor,
        borderless,
      );
      return (
        <TouchableNativeFeedback {...props} background={background}>
          <View style={style}>
            {children}
          </View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity {...props} style={style}>
          {children}
        </TouchableOpacity>
      );
    }
  }
}

export default TouchableView;
