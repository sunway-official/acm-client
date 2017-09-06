import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import TouchableView from '../../Component/TouchableView';
import { Colors, Metrics, Icons } from '../../Theme';
import styles from './styles';

const IS_ANDROID = Platform.OS === 'android';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    float: PropTypes.bool,
    theme: PropTypes.oneOf(['dark', 'light']),
    style: View.propTypes.style,
    icon: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Icons.ICON_TYPE),
    }),
    onIconPress: PropTypes.func,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.oneOf(Icons.ICON_TYPE),
        }).isRequired,
        onPress: PropTypes.func,
        // counter: PropTypes.shape(),
      }),
    ),
  };

  constructor(props) {
    super(props);
  }

  _wrapperStyles = {};
  _headerStyles = {
    backgroundColor: Colors.primary,
    // For Android
    paddingTop: IS_ANDROID ? StatusBar.currentHeight : 0,
    // For iOS
    borderTopWidth: IS_ANDROID ? 0 : Metrics.iOSStatusBarHeight,
    borderTopColor: IS_ANDROID ? null : Colors.primaryDark, // StatusBar color
  };
  _textStyles = {
    color: Colors.white,
  };
  _iconStyles = {
    color: Colors.white,
    size: Metrics.icons.small,
  };
  _touchableViewStyles = {
    borderless: true,
  };

  _renderAction({ icon, onPress }, index) {
    let actionWrapperStyles = [styles.rightIconWrapper];
    if (index === 0) {
      actionWrapperStyles = [...actionWrapperStyles, styles.firstRightIcon];
    }
    return (
      <TouchableView
        key={index}
        {...this._touchableViewStyles}
        style={[actionWrapperStyles]}
      >
        <Icon
          name="music-video"
          {...icon}
          {...this._iconStyles}
          onPress={onPress}
        />
      </TouchableView>
    );
  }

  render() {
    const { title, float, theme, icon, onIconPress, actions = [] } = this.props;
    const containerStyle = this.props.style;

    if (float) {
      wrapperStyle = {
        ...wrapperStyles,
        position: 'absolute',
        left: 0,
        right: 0,
      };
    }
    return (
      <View style={this._wrapperStyles}>
        <StatusBar
          backgroundColor={Colors.primaryDark}
          barStyle="light-content"
        />
        <View
          style={[styles.header, this._headerStyles, containerStyle]}
          // onLayout={event => (this._headerContainer = event.nativeEvent.layout)}
        >
          <View style={styles.leftWrapper}>
            <TouchableView
              style={styles.iconWrapper}
              {...this._touchableViewStyles}
            >
              <Icon
                name="menu"
                {...icon}
                {...this._iconStyles}
                onPress={onIconPress}
              />
            </TouchableView>
          </View>
          <View style={styles.centerWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={[styles.title, this._textStyles]}>
                {title}
              </Text>
            </View>
          </View>
          <View style={styles.rightWrapper}>
            {actions.map(this._renderAction.bind(this))}
          </View>
        </View>
      </View>
    );
  }
}

export default Header;
