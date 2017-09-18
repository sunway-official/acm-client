import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';
import { Text, TouchableView } from '~/Component';
import { Colors, Metrics, Icons } from '~/Theme';
import SearchContent from './Search';
import DefaultContent from './Default';
import styles from './styles';

const IS_ANDROID = Platform.OS === 'android';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const HIDDING_DELAY = 150;

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    hideTitle: PropTypes.bool,
    visible: PropTypes.bool,
    float: PropTypes.bool,
    backgroundColor: PropTypes.string,
    statusBarBackgroundColor: PropTypes.string,
    borderBottomColor: PropTypes.string,
    theme: PropTypes.oneOf([THEME_DARK, THEME_LIGHT]),
    style: View.propTypes.style,
    icon: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.oneOf(Icons.ICON_TYPE),
    }),
    onIconPress: PropTypes.func,
    actions: PropTypes.arrayOf(
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
    search: PropTypes.shape({
      enable: PropTypes.bool,
      value: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._getTheme = this._getTheme.bind(this);
    this._statusBarStyle = this._statusBarStyle.bind(this);
    this._wrapperStyles = this._wrapperStyles.bind(this);
    this._headerStyles = this._headerStyles.bind(this);
  }

  _getTheme = () => this.props.theme || THEME_LIGHT;

  _wrapperStyles = () => {
    const theme = this._getTheme();

    const { statusBarBackgroundColor, borderBottomColor } = this.props;
    let styles = {
      borderTopWidth: IS_ANDROID
        ? // For Android
          StatusBar.currentHeight
        : // For iOS
          Metrics.iOSStatusBarHeight,
      borderTopColor: IS_ANDROID
        ? // For Android
          theme === THEME_DARK ? Colors.primary : Colors.secondaryDark
        : // For iOS
          theme === THEME_DARK ? Colors.primaryDark : Colors.secondaryDark,
      borderBottomWidth: theme === THEME_DARK ? 0 : 1,
      borderBottomColor: 'rgba(0,0,0,0.075)',
    };
    if (borderBottomColor) {
      styles = {
        ...styles,
        borderBottomWidth: 1,
        borderBottomColor: borderBottomColor,
      };
    }
    if (statusBarBackgroundColor) {
      styles = {
        ...styles,
        borderTopColor: statusBarBackgroundColor,
      };
    }
    return styles;
  };

  _statusBarStyle = () => {
    // const theme = this._getTheme();
    return 'light-content';
  };

  _headerStyles = () => {
    const theme = this._getTheme();
    const { backgroundColor, float } = this.props;
    let styles = {
      backgroundColor: theme === THEME_DARK ? Colors.primary : Colors.white,
    };
    if (backgroundColor) {
      styles = {
        ...styles,
        backgroundColor,
      };
    }
    return styles;
  };

  render() {
    const { search = {}, visible } = this.props;
    const containerStyle = this.props.style;

    return (
      <View style={this._wrapperStyles()}>
        <StatusBar
          backgroundColor={Colors.primaryDark}
          barStyle={this._statusBarStyle()}
        />
        <AnimatableView
          style={[styles.header, this._headerStyles(), containerStyle]}
          animation={visible ? 'slideInDown' : 'slideOutUp'}
          duration={HIDDING_DELAY}
        >
          {search.enable
            ? <SearchContent
                value={search.value}
                placeholder={search.placeholder}
              />
            : <DefaultContent {...this.props} />}
        </AnimatableView>
      </View>
    );
  }
}

export default connect()(Header);
