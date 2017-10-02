import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Modal } from '~/Component';
import { Colors } from '~/Theme';
import styles from './styles';
import { connect } from 'react-redux';
import { KEY } from '~/Redux/Toolbar';
import { closeMenu } from '~/Redux/Toolbar/action';

const HeaderMenu = ({ menu: { isOpen }, dispatch }) => {
  return (
    <Modal
      isVisible={isOpen}
      backdropColor={Colors.transparent}
      style={styles.modal}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={() => dispatch(closeMenu())}
    >
      <View backgroundColor="white">
        <Text>Hello there</Text>
      </View>
    </Modal>
  );
};

HeaderMenu.propTypes = {
  menu: PropTypes.shape({
    isOpen: PropTypes.bool,
  }),
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  menu: state[KEY].header.menu,
});

export default connect(mapStateToProps)(HeaderMenu);
