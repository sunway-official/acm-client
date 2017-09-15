import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { Colors } from '~/Theme';
import { connect } from 'react-redux';
import { KEY as ROUTE_KEY } from '~/Redux/Routes';
import { KEY as NAVIGATION_KEY } from '~/Redux/Navigation';
import { View as AnimatableView } from 'react-native-animatable';

import { NavigationActions } from '~/Redux/Navigation';
import { NavigationActions as ReactNavigationActions } from 'react-navigation';

import Tab from './Tab';
import styles from './styles';

const IS_ANDROID = Platform.OS === 'android';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

const HIDDING_DELAY = 300;

class Footer extends Component {
  static propTypes = {
    theme: PropTypes.oneOf([THEME_DARK, THEME_LIGHT]),
    visible: PropTypes.bool,
    style: View.propTypes.style,
    drawer: PropTypes.shape({
      isOpen: PropTypes.bool,
    }),
    routes: PropTypes.object,
    navigation: PropTypes.object,
    navigate: PropTypes.func,
    reset: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._getTheme = this._getTheme.bind(this);
    this._wrapperStyles = this._wrapperStyles.bind(this);
    this._footerStyles = this._footerStyles.bind(this);
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

  _renderTabs() {
    const { routes, theme, navigation, reset } = this.props;
    const { routeName } = navigation.routes[navigation.index];
    let tabs = [];
    Object.keys(routes).map(key => {
      const { name, footer, icon, activeIcon } = routes[key];
      if (footer) {
        const onPress = () => {
          if (routeName === key) {
          } else {
            reset({
              index: 0,
              actions: [ReactNavigationActions.navigate({ routeName: key })],
            });
          }
        };
        tabs.push(
          <Tab
            theme={theme}
            key={key}
            title={name}
            icon={icon}
            activeIcon={activeIcon}
            option={footer}
            onPress={onPress}
            active={routeName === key}
          />,
        );
      }
    });
    return tabs;
  }

  render() {
    const { visible } = this.props;
    const containerStyle = this.props.style;

    return (
      <View style={this._wrapperStyles()}>
        <AnimatableView
          style={[styles.footer, this._footerStyles(), containerStyle]}
          animation={visible ? 'slideInUp' : 'slideOutDown'}
          duration={HIDDING_DELAY}
        >
          {this._renderTabs()}
        </AnimatableView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  routes: state[ROUTE_KEY],
  navigation: state[NAVIGATION_KEY],
});

const mapDispatchToProps = dispatch => ({
  navigate: routeName => dispatch(NavigationActions.navigate({ routeName })),
  reset: option => dispatch(NavigationActions.reset(option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
