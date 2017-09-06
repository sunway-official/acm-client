import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { KEY as NAVIGATION_KEY } from '../../Redux/Navigation';
import { KEY as DRAWER_KEY, setDrawerState } from '../../Redux/Drawer';
import { KEY as ROUTES_KEY } from '../../Redux/Routes';
import { NavigationActions } from 'react-navigation';
import { Colors } from '../../Theme';
import Header from './';
import styles from './styles';

const LEFT_ICON_IS_DRAWER = 'drawer';
const LEFT_ICON_IS_BACK = 'back';

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
  }

  _openDrawer() {
    this.props.openDrawer();
  }

  _navigateBack() {
    this.props.navigateBack();
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
      icon.name = 'keyboard-backspace';
    }

    return (
      <View style={styles.container}>
        <Header
          {...header}
          title={title}
          icon={icon}
          onIconPress={onIconPress}
        />
        {this.props.children}
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
