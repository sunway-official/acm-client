import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { KEY as NAVIGATION_KEY } from '~/Redux/Navigation';
import { KEY as DRAWER_KEY, setDrawerState } from '~/Redux/Drawer';
import { KEY as ROUTES_KEY } from '~/Redux/Routes';
import { KEY as TOOLBAR_KEY } from '~/Redux/Toolbar';
import { NavigationActions } from '~/Redux/Navigation';
import { Header, Footer } from './';
import HeaderMenu from './Header/Menu';
import styles from './styles';

/* eslint-disable no-unused-vars */
const LEFT_ICON_IS_DRAWER = 'drawer';
const LEFT_ICON_IS_BACK = 'back';
/* eslint-enable no-unused-vars */

const ICON_ON_PRESS_DELAY = 0;

const ABSOLUTE_CONTAINER = {
  position: 'absolute',
  left: 0,
  right: 0,
  width: '100%',
};

class HeaderWrapper extends Component {
  static propTypes = {
    children: PropTypes.any,
    navigation: PropTypes.object,
    drawer: PropTypes.object,
    routes: PropTypes.object,
    toolbar: PropTypes.object,
    openDrawer: PropTypes.func,
    navigateBack: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      header: {},
      footer: {},
    };

    this._openDrawer = this._openDrawer.bind(this);
    this._navigateBack = this._navigateBack.bind(this);
    this._floatToolbarStyles = this._floatToolbarStyles.bind(this);
    this._childrenStyles = this._childrenStyles.bind(this);
  }

  _openDrawer() {
    setTimeout(() => this.props.openDrawer(), ICON_ON_PRESS_DELAY);
  }

  _navigateBack() {
    this.props.navigateBack();
  }

  _floatToolbarStyles() {
    const { drawer } = this.props;
    let styles = {
      ...ABSOLUTE_CONTAINER,
      zIndex: 1,
    };
    if (drawer.isOpen) {
      return {
        ...styles,
        zIndex: 0,
      };
    }
    return styles;
  }

  _childrenStyles(headerFloat, footerFloat) {
    const { drawer, toolbar } = this.props;
    const { header, footer } = this.state;
    let styles = {
      paddingTop: headerFloat ? 0 : header.height,
      paddingBottom: footerFloat ? 0 : footer.height || 0,
    };
    if (
      (toolbar.header.options && toolbar.header.options.disable) ||
      !toolbar.header.visible
    ) {
      styles = {
        ...styles,
        paddingTop: 0,
      };
    }
    if (
      (toolbar.footer.options && toolbar.footer.options.disable) ||
      !toolbar.footer.visible
    ) {
      styles = {
        ...styles,
        paddingBottom: 0,
      };
    }
    if (drawer.isOpen) {
      return {
        ...styles,
        zIndex: -1,
      };
    }
    return styles;
  }

  render() {
    const { navigation, drawer, routes, toolbar } = this.props;
    const { routeName } = navigation.routes[navigation.index];
    const route = routes[routeName];

    const header = toolbar.header.options;
    const footer = toolbar.footer.options;

    let title = route ? route.name : '';

    if (toolbar.header.options && toolbar.header.options.title !== undefined) {
      title = toolbar.header.options.title;
    }

    let onIconPress = this._openDrawer;
    let icon = {};
    if (header && header.leftIcon === LEFT_ICON_IS_BACK) {
      onIconPress = this._navigateBack;
      icon.name = 'arrow-back';
    }
    return (
      <View style={[styles.container, styles.relativeContainer]}>
        <View
          style={{ ...this._floatToolbarStyles(), top: 0 }}
          onLayout={event =>
            this.setState({ header: event.nativeEvent.layout })}
        >
          <Header
            {...header}
            title={title}
            icon={icon}
            onIconPress={onIconPress}
            drawer={drawer}
            visible={toolbar.header.visible}
          />
          <HeaderMenu />
        </View>
        <View
          style={[
            styles.container,
            this._childrenStyles(header && header.float),
          ]}
        >
          {this.props.children}
        </View>
        <View
          style={{ ...this._floatToolbarStyles(), bottom: 0 }}
          onLayout={event =>
            this.setState({ footer: event.nativeEvent.layout })}
        >
          <Footer
            {...footer}
            title={title}
            icon={icon}
            onIconPress={onIconPress}
            drawer={drawer}
            theme="light"
            visible={toolbar.footer.visible}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state[NAVIGATION_KEY],
  drawer: state[DRAWER_KEY],
  routes: state[ROUTES_KEY],
  toolbar: state[TOOLBAR_KEY],
});

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(setDrawerState(true)),
  navigateBack: () => dispatch(NavigationActions.back()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper);
