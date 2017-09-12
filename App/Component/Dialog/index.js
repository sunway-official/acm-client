import React, { Component } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

import TouchableView from '../TouchableView';
import Text from '../Text';

class Dialog extends Component {
  state = {
    modalVisible: false,
  };

  static propTypes = {
    header: PropTypes.string,
    content: PropTypes.object,
    actions: PropTypes.array,
  };

  _renderActions(actions) {
    var actionsButton = [];
    actions.map((action, i) =>
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
      ),
    );
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
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={() => {
              this.setModalVisible(false);
            }}
          >
            <View style={styles.cardModalContainer}>
              <View style={styles.headerContainer}>
                <Text bold style={styles.headerText}>
                  {header}
                </Text>
              </View>

              <View style={styles.contentContainer}>
                {content}
              </View>

              <View style={styles.actionContainer}>
                <TouchableView
                  style={styles.actionButton}
                  onPress={() => this.setModalVisible(false)}
                >
                  <Text medium style={styles.actionText}>
                    CANCEL
                  </Text>
                </TouchableView>

                {this._renderActions(actions)}
              </View>
            </View>
          </TouchableOpacity>
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
