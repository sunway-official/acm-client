import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

import TouchableView from '../TouchableView';
import Text from '../Text';
import Modal from '../Modal';

class Dialog extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onBackdropPress: PropTypes.func,
    header: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    isVisible: false,
    onBackdropPress: () => null,
    header: 'This is header',
  };

  // using for composition action button
  // _renderActions(actions) {
  //   var actionsButton = [];
  //   actions.map((action, i) => {
  //     action.name === 'Cancel'
  //       ? (action.handleSubmit = () => this.setModalVisible(false))
  //       : action.handleSubmit;

  //     actionsButton.push(
  //       <TouchableView
  //         key={i}
  //         style={styles.actionButton}
  //         onPress={action.handleSubmit}
  //       >
  //         <Text lighter style={styles.actionText}>
  //           {action.name}
  //         </Text>
  //       </TouchableView>,
  //     );
  //   });
  //   return actionsButton;
  // }

  render() {
    const { isVisible, onBackdropPress, header, children } = this.props;
    return (
      <Modal
        animationIn="zoomIn"
        animationOut="zoomOut"
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
        style={styles.container}
      >
        <View style={styles.cardModalContainer}>
          <View style={styles.headerContainer}>
            <Text bold medium style={styles.headerText}>
              {header}
            </Text>
          </View>
          <View>
            {children}
          </View>
        </View>
      </Modal>
    );
  }
}

export default Dialog;
