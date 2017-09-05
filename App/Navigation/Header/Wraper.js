import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { KEY as NAVIGATION_KEY } from '../../Redux/Navigation';
import { KEY as DRAWER_KEY, setDrawerState } from '../../Redux/Drawer';
import { KEY as ROUTES_KEY } from '../../Redux/Routes';
import { Colors } from '../../Theme';
import Header from './';
import styles from './styles';

class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.any,
    navigation: PropTypes.object,
    drawer: PropTypes.object,
    routes: PropTypes.object,
    openDrawer: PropTypes.func,
  };
  constructor(props) {
    super(props);

    this._openDrawer = this._openDrawer.bind(this);
  }

  _openDrawer() {
    console.log('hello');
    this.props.openDrawer();
  }

  render() {
    const { navigation, drawer, routes } = this.props;
    const routeName = navigation.routes[navigation.index].routeName;
    const { name } = routes[routeName];

    return (
      <View style={styles.container}>
        <Header>
          {name}
        </Header>
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
});

const ConnectedWrapper = connect(mapStateToProps, mapDispatchToProps)(Wrapper);

export default ConnectedWrapper;

export const wrapHeader = Scene => {
  return () =>
    <ConnectedWrapper>
      <Scene />
    </ConnectedWrapper>;
};
