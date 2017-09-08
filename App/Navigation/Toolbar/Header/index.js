import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, TouchableView } from '~/Component';
import { Colors, Metrics, Icons } from '~/Theme';
import styles from './styles';

const IS_ANDROID = Platform.OS === 'android';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

class Header extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    hideTitle: PropTypes.bool,
    float: PropTypes.bool,
    backgroundColor: PropTypes.string,
    statusBarBackgroundColor: PropTypes.string,
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
  };

  constructor(props) {
    super(props);

    this._getTheme = this._getTheme.bind(this);
    this._statusBarStyle = this._statusBarStyle.bind(this);
    this._wrapperStyles = this._wrapperStyles.bind(this);
    this._headerStyles = this._headerStyles.bind(this);
    this._textStyles = this._textStyles.bind(this);
    this._iconStyles = this._iconStyles.bind(this);
    this._touchableViewStyles = this._touchableViewStyles.bind(this);
  }

  _getTheme = () => this.props.theme || THEME_DARK;

  _wrapperStyles = () => {
    // const theme = this._getTheme();
    if (IS_ANDROID) return {};
    return {
      position: 'relative',
    };
  };

  _statusBarStyle = () => {
    // const theme = this._getTheme();
    return 'light-content';
  };

  _headerStyles = () => {
    const theme = this._getTheme();
    const { backgroundColor, statusBarBackgroundColor, float } = this.props;
    let styles = {
      backgroundColor: theme === THEME_DARK ? Colors.primary : Colors.white,

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
    };
    if (backgroundColor) {
      styles = {
        ...styles,
        backgroundColor,
      };
    }
    if (statusBarBackgroundColor) {
      styles = {
        ...styles,
        borderTopColor: statusBarBackgroundColor,
      };
    }
    if (IS_ANDROID && !float && this.props.drawer.isOpen === false) {
      styles.elevation = 8;
    }
    return styles;
  };

  _textStyles = () => {
    const theme = this._getTheme();
    return {
      color: theme === THEME_DARK ? Colors.white : Colors.darkGrey,
    };
  };

  _iconStyles = () => {
    const theme = this._getTheme();
    return {
      color: theme === THEME_DARK ? Colors.white : Colors.darkGrey,
      size: Metrics.icons.small,
    };
  };

  _touchableViewStyles = () => {
    const theme = this._getTheme();
    return {
      rippleColor: theme === THEME_DARK ? Colors.white : Colors.darkGrey,
      borderless: true,
    };
  };

  _renderAction({ icon, onPress }, index) {
    let actionWrapperStyles = [styles.rightIconWrapper];
    if (index === 0) {
      actionWrapperStyles = [...actionWrapperStyles, styles.firstRightIcon];
    }
    return (
      <TouchableView
        key={index}
        {...this._touchableViewStyles()}
        style={[actionWrapperStyles]}
        onPress={onPress}
      >
        <Icon
          name="more-vert"
          {...icon}
          onPress={undefined}
          {...this._iconStyles()}
        />
      </TouchableView>
    );
  }

  render() {
    const {
      title,
      hideTitle,
      float,
      icon,
      onIconPress,
      actions = [],
    } = this.props;
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
        <StatusBar
          backgroundColor={Colors.primaryDark}
          barStyle={this._statusBarStyle()}
        />
        <View
          style={[styles.header, this._headerStyles(), containerStyle]}
          // onLayout={event => (this._headerContainer = event.nativeEvent.layout)}
        >
          <View style={styles.leftWrapper}>
            <TouchableView
              style={styles.iconWrapper}
              {...this._touchableViewStyles()}
              onPress={onIconPress}
            >
              <Icon
                name="menu"
                {...icon}
                onPress={undefined}
                {...this._iconStyles()}
              />
            </TouchableView>
          </View>
          {hideTitle ||
            <View style={styles.centerWrapper}>
              <View style={styles.titleWrapper}>
                <Text bold style={[styles.title, this._textStyles()]}>
                  {title}
                </Text>
              </View>
            </View>}

          <View style={styles.rightWrapper}>
            {actions.map(this._renderAction.bind(this))}
          </View>
        </View>
      </View>
    );
  }
}

export default Header;
