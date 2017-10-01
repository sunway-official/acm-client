import React from 'react';
import { View, Animated } from 'react-native';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View as AninatableView } from 'react-native-animatable';
import { KEY, setDrawerState } from '~/Redux/Drawer';
import Menu from './Menu';
import { Metrics, Enviroment } from '~/Theme';
import styles from './styles';

const drawerOffset = 0.8;
const BACKDROP_ANIMATION_NAME = 'fadeIn';
const ANIMATION_DELAY = 300;
const SIDE_MENU_ANIMATION_FRICTION = 9;

const animationFunction = (prop, value) => {
  if (Enviroment.isDebuggingEnabled) {
    return Animated.timing(prop, {
      toValue: value,
      duration: 0,
    });
  }
  return Animated.spring(prop, {
    toValue: value,
    friction: SIDE_MENU_ANIMATION_FRICTION,
  });
};

const Drawer = ({ drawer, setDrawerState, children }) =>
  <SideMenu
    menu={<Menu />}
    isOpen={drawer.isOpen}
    onChange={isOpen => setDrawerState(isOpen)}
    openMenuOffset={Metrics.screenWidth * drawerOffset}
    bounceBackOnOverdraw={false}
    animationFunction={animationFunction}
    disableGestures={drawer.disableGestures}
  >
    <View style={[styles.container, styles.relativeContainer]}>
      {children}
      {drawer.isOpen &&
        <AninatableView
          animation={BACKDROP_ANIMATION_NAME}
          style={styles.backdrop}
          duration={ANIMATION_DELAY}
        />}
    </View>
  </SideMenu>;

Drawer.propTypes = {
  drawer: PropTypes.object,
  setDrawerState: PropTypes.func,
  children: PropTypes.element,
};

const mapStateToProps = state => ({
  drawer: state[KEY],
});

const mapDispatchToProps = dispatch => {
  return {
    setDrawerState: isOpen => {
      dispatch(setDrawerState(isOpen));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
