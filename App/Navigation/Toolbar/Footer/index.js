import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { View as AninatableView } from 'react-native-animatable';
import { Text, TouchableView } from '~/Component';
import { Colors, Metrics, Icons, Fonts } from '~/Theme';
import tabs from './fixture';
import styles from './styles';

const IS_ANDROID = Platform.OS === 'android';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

const BACKDROP_ANIMATION_NAME = 'fadeIn';
const BACKDROP_ANIMATION_DELAY = 300;

class Header extends Component {
  static propTypes = {
    float: PropTypes.bool,
    theme: PropTypes.oneOf([THEME_DARK, THEME_LIGHT]),
    style: View.propTypes.style,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.PropTypes.shape({
          name: PropTypes.string,
          type: PropTypes.oneOf(Icons.ICON_TYPE),
        }).isRequired,
        onPress: PropTypes.func.isRequired,
        // counter: PropTypes.shape(),
      }),
    ),
    drawer: PropTypes.shape({
      isOpen: PropTypes.bool,
    }),
  };

  constructor(props) {
    super(props);

    this._getTheme = this._getTheme.bind(this);
    this._wrapperStyles = this._wrapperStyles.bind(this);
    this._footerStyles = this._footerStyles.bind(this);
    this._textStyles = this._textStyles.bind(this);
    this._iconStyles = this._iconStyles.bind(this);
    this._touchableViewStyles = this._touchableViewStyles.bind(this);
  }

  _getTheme = () => this.props.theme || THEME_DARK;

  _wrapperStyles = () => {
    // const theme = this._getTheme();
    if (IS_ANDROID) return {};
    return {};
  };

  _footerStyles = () => {
    const theme = this._getTheme();
    let styles = {
      backgroundColor: theme === THEME_DARK ? Colors.black : Colors.white,
    };
    if (IS_ANDROID && this.props.drawer.isOpen === false) {
      styles.elevation = 8;
    }
    return styles;
  };

  _textStyles = color => {
    const theme = this._getTheme();
    return {
      color: color || (theme === THEME_DARK ? Colors.white : Colors.darkGrey),
      textAlign: 'center',
      fontSize: Fonts.size.small,
    };
  };

  _iconStyles = color => {
    const theme = this._getTheme();
    return {
      color: color || (theme === THEME_DARK ? Colors.white : Colors.darkGrey),
      size: Metrics.icons.small,
    };
  };

  _touchableViewStyles = color => {
    const theme = this._getTheme();
    return {
      rippleColor:
        color || (theme === THEME_DARK ? Colors.white : Colors.darkGrey),
      borderless: true,
    };
  };

  _renderTabs() {
    return tabs.map(({ title, icon, activeColor, active, onPress }, index) => {
      return (
        <TouchableView
          key={index}
          {...this._touchableViewStyles(activeColor)}
          style={[styles.tabWrapper]}
          onPress={onPress}
        >
          <Icon
            name="more-vert"
            {...icon}
            onPress={undefined}
            {...this._iconStyles(active && activeColor)}
          />
          <Text
            light
            style={[styles.tabLabel, this._textStyles(active && activeColor)]}
          >
            {title}
          </Text>
        </TouchableView>
      );
    });
  }

  render() {
    const { float, drawer, tabs = [] } = this.props;
    const containerStyle = this.props.style;

    let wrapperStyles = this._wrapperStyles();
    if (float) {
      wrapperStyle = {
        ...wrapperStyles,
        position: 'absolute',
        left: 0,
        right: 0,
      };
    }
    return (
      <View style={wrapperStyles}>
        <View
          style={[styles.footer, this._footerStyles(), containerStyle]}
          // onLayout={event => (this._headerContainer = event.nativeEvent.layout)}
        >
          {this._renderTabs()}
        </View>
        {drawer.isOpen &&
          <AninatableView
            animation={BACKDROP_ANIMATION_NAME}
            style={styles.backdrop}
            duration={BACKDROP_ANIMATION_DELAY}
          />}
      </View>
    );
  }
}

export default Header;
