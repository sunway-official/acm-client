import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, Modal, TouchableView } from '~/Component';
import { Colors, Icons } from '~/Theme';
import styles from './styles';
import { connect } from 'react-redux';
import { KEY } from '~/Redux/Toolbar';
import { closeMenu } from '~/Redux/Toolbar/action';

/*eslint-disable react/prop-types*/
const _renderActions = ({ title, icon, onPress }, index, dispatch) => {
  return (
    <TouchableView
      key={index}
      style={styles.item}
      rippleColor={Colors.primary}
      onPress={() => onPress(dispatch)}
    >
      <View style={styles.iconWrapper}>
        <Icon name="menu" {...icon} onPress={undefined} />
      </View>
      <Text>{title}</Text>
    </TouchableView>
  );
};
/*eslint-enable react/prop-types*/

const HeaderMenu = ({
  isOpen,
  menu: { actions },
  // header,
  dispatch,
}) => {
  return (
    <Modal
      isVisible={isOpen}
      backdropColor={Colors.transparent}
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={() => dispatch(closeMenu())}
    >
      <View style={styles.container}>
        {actions.map((item, index) => _renderActions(item, index, dispatch))}
      </View>
    </Modal>
  );
};

HeaderMenu.defaultProps = {
  menu: {
    actions: [],
  },
};

HeaderMenu.propTypes = {
  isOpen: PropTypes.bool,
  menu: PropTypes.shape({
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.PropTypes.shape({
          name: PropTypes.string,
          type: PropTypes.oneOf(Icons.ICON_TYPE),
        }).isRequired,
        onPress: PropTypes.func,
      }),
    ),
  }),
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  isOpen: state[KEY].header.menu.isOpen,
  menu: state[KEY].header.options && state[KEY].header.options.menu,
});

export default connect(mapStateToProps)(HeaderMenu);
