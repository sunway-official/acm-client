import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { KEY as NAVIGATION_KEY } from '~/Redux/Navigation';
import { KEY as DRAWER_KEY, setDrawerState } from '~/Redux/Drawer';
import { KEY as ROUTES_KEY } from '~/Redux/Routes';
import { NavigationActions } from 'react-navigation';
import { Header, Footer } from './';
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

class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.any,
    navigation: PropTypes.object,
    drawer: PropTypes.object,
    routes: PropTypes.object,
    openDrawer: PropTypes.func,
    navigateBack: PropTypes.func,
  };
  constructor(props) {
    super(props);

    this._openDrawer = this._openDrawer.bind(this);
    this._navigateBack = this._navigateBack.bind(this);
    this._floatFooterStyles = this._floatFooterStyles.bind(this);
    this._floatHeaderStyles = this._floatHeaderStyles.bind(this);
  }

  _openDrawer() {
    setTimeout(() => this.props.openDrawer(), ICON_ON_PRESS_DELAY);
  }

  _navigateBack() {
    this.props.navigateBack();
  }

  _floatHeaderStyles() {
    return {
      ...ABSOLUTE_CONTAINER,
      top: 0,
    };
  }

  _floatFooterStyles() {
    return {
      ...ABSOLUTE_CONTAINER,
      bottom: 0,
    };
  }

  render() {
    const { navigation, drawer, routes } = this.props;
    const { routeName } = navigation.routes[navigation.index];
    const route = routes[routeName];
    const title = route ? route.name : '';
    const header = route.header || {};

    let onIconPress = this._openDrawer;
    let icon = {};
    if (header.leftIcon === LEFT_ICON_IS_BACK) {
      onIconPress = this._navigateBack;
      icon.name = 'arrow-back';
    }

    return (
      <View style={[styles.container, styles.relativeContainer]}>
        <View style={this._floatHeaderStyles()}>
          <Header
            {...header}
            title={title}
            icon={icon}
            onIconPress={onIconPress}
            drawer={drawer}
          />
        </View>
        {this.props.children}
        <View style={this._floatFooterStyles()}>
          <Footer
            {...header}
            title={title}
            icon={icon}
            onIconPress={onIconPress}
            drawer={drawer}
            theme="light"
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
});

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(setDrawerState(true)),
  navigateBack: () => dispatch(NavigationActions.back()),
});

const ConnectedWrapper = connect(mapStateToProps, mapDispatchToProps)(Wrapper);

export default ConnectedWrapper;

export const wrapHeader = Scene => {
  return () =>
    <ConnectedWrapper>
      <Scene />
    </ConnectedWrapper>;
};
