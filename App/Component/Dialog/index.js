import React, { Component } from 'react';
import { View, Modal, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import { Images } from '~/Theme';

import TouchableView from '../TouchableView';
import Text from '../Text';

class Dialog extends Component {
  state = {
    modalVisible: this.props.visible,
  };

  static propTypes = {
    header: PropTypes.string,
    content: PropTypes.string,
    actions: PropTypes.array,
    visible: PropTypes.bool,
    buttonClick: PropTypes.object,
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
          <Text lighter style={styles.actionText}>
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
    const { header, content, actions, buttonClick } = this.props;
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
                <Image style={styles.headerImage} source={Images.smile} />
                <Text bold medium style={styles.headerText}>
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
          {buttonClick}
        </TouchableView>
      </View>
    );
  }
}

export default Dialog;
