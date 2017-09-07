import React, { Component } from 'react';
import { View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View as AninatableView } from 'react-native-animatable';
import { KEY, setDrawerState } from '../../Redux/Drawer';
import Menu from './Menu';
import { Metrics } from '../../Theme';
import styles from './styles';

const drawerOffset = 0.8;
const BACKDROP_ANIMATION_NAME = 'fadeIn';
const BACKDROP_ANIMATION_DELAY = 300;

class Drawer extends Component {
  static propTypes = {
    drawer: PropTypes.object,
    setDrawerState: PropTypes.func,
    children: PropTypes.element,
  };

  render() {
    const { drawer, setDrawerState } = this.props;
    return (
      <SideMenu
        menu={<Menu />}
        isOpen={drawer.isOpen}
        onChange={isOpen => setDrawerState(isOpen)}
        openMenuOffset={Metrics.screenWidth * drawerOffset}
        bounceBackOnOverdraw={false}
      >
        <View style={[styles.container, styles.relativeContainer]}>
          {this.props.children}
          {drawer.isOpen && (
            <AninatableView
              animation={BACKDROP_ANIMATION_NAME}
              style={styles.backdrop}
              duration={BACKDROP_ANIMATION_DELAY}
            />
          )}
        </View>
      </SideMenu>
    );
  }
}

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
