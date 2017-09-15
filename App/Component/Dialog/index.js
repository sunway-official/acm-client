import React, { Component } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

import TouchableView from '../TouchableView';
import Text from '../Text';

class Dialog extends Component {
  state = {
    modalVisible: this.props.isOpen,
  };

  static propTypes = {
    header: PropTypes.string,
    content: PropTypes.string,
    actions: PropTypes.array,
    isOpen: PropTypes.bool,
  };

  static defaultProps = {
    header: 'Welcome',
    content: 'This is content',
    actions: [
      {
        name: 'CONFIRM',
        handleSubmit: () => console.log('clicked confirm!'),
      },
    ],
  };

  _renderActions(actions) {
    var actionsButton = [];
    actions.map((action, i) => {
      action.name === 'Cancel'
        ? (action.handleSubmit = () => this.setModalVisible(false))
        : action.handleSubmit;

      actionsButton.push(
        <TouchableView
          key={i}
          style={styles.actionButton}
          onPress={action.handleSubmit}
        >
          <Text medium style={styles.actionText}>
            {action.name}
          </Text>
        </TouchableView>,
      );
    });
    return actionsButton;
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { header, content, actions } = this.props;
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={styles.container}>
            <TouchableView
              style={styles.backdrop}
              activeOpacity={1}
              onPress={() => {
                this.setModalVisible(false);
              }}
            />
            <View style={styles.cardModalContainer}>
              <View style={styles.headerContainer}>
                <Text bold style={styles.headerText}>
                  {header}
                </Text>
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.contentText}>
                  {content}
                </Text>
              </View>

              <View style={styles.actionContainer}>
                {this._renderActions(actions)}
              </View>
            </View>
          </View>
        </Modal>

        <TouchableView
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Dialog</Text>
        </TouchableView>
      </View>
    );
  }
}

export default Dialog;