import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { AnimatableView } from '~/Component';
import { Colors, Metrics } from '~/Theme';
import { IS_ANDROID } from '~/env';
import SearchContent from './Search';
import DefaultContent from './Default';
import styles from './styles';

const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const HIDDING_DELAY = 150;

const SWITCH_CONTENT_ANIMATION = 'fadeIn';
const SWITCH_CONTENT_DELAY = 300;

class Header extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    backgroundColor: PropTypes.string,
    statusBarBackgroundColor: PropTypes.string,
    borderBottomColor: PropTypes.string,
    theme: PropTypes.oneOf([THEME_DARK, THEME_LIGHT]),
    style: View.propTypes.style,
    drawer: PropTypes.shape({
      isOpen: PropTypes.bool,
    }),
    search: PropTypes.object,
    dispatch: PropTypes.func,
    disable: PropTypes.bool,
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
      borderTopWidth: Metrics.statusBarHeight,
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
    const { backgroundColor } = this.props;
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
    const { search = {}, visible, disable } = this.props;
    const containerStyle = this.props.style;

    return (
      <View style={this._wrapperStyles()}>
        <StatusBar
          backgroundColor={Colors.primaryDark}
          barStyle={this._statusBarStyle()}
        />
        {disable || (
          <AnimatableView
            style={[styles.header, this._headerStyles(), containerStyle]}
            animation={visible ? 'slideInDown' : 'slideOutUp'}
            duration={HIDDING_DELAY}
          >
            {search.enable && (
              <SearchContent {...this.props} {...this.props.search} />
            )}
            {search.enable || (
              <AnimatableView
                animation={SWITCH_CONTENT_ANIMATION}
                duration={SWITCH_CONTENT_DELAY}
                style={styles.container}
              >
                <DefaultContent {...this.props} />
              </AnimatableView>
            )}
          </AnimatableView>
        )}
      </View>
    );
  }
}

export default connect()(Header);
