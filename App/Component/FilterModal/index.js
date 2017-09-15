import React, { Component } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

import TouchableView from '../TouchableView';
import Text from '../Text';

import { Icon } from 'react-native-elements';
import { Colors } from '~/Theme/';
const randomColor = ['red', 'blue', 'green', 'pink'];

class FilterModal extends Component {
  state = {
    modalVisible: false,
    isCheck: Array(this.props.contents.length).fill(false),
  };

  static propTypes = {
    header: PropTypes.string,
    contents: PropTypes.array,
    actions: PropTypes.array,
  };

  static defaultProps = {
    header: 'Welcome',
    contents: [],
    actions: [
      {
        name: 'CONFIRM',
        handleSubmit: () => console.log('clicked confirm!'),
      },
    ],
  };

  _renderContents(contents) {
    var contentsButton = [];
    var isCheck = this.state.isCheck;

    contents.map((content, index) => {
      var iconCheck =
        isCheck[index] === true
          ? <Icon name={'md-radio-button-on'} type={'ionicon'} size={15} />
          : <Icon name={'md-radio-button-off'} type={'ionicon'} size={15} />;

      contentsButton.push(
        <TouchableView
          key={index}
          rippleColor={Colors.grey}
          style={[
            styles.filterContentContainer,
            { borderLeftColor: randomColor[index] },
          ]}
          onPress={() => this.setRadioCheck(!isCheck[index], index)}
        >
          <View>
            <Text>
              {content.name}
            </Text>
          </View>
          <TouchableOpacity style={styles.filterContentIcon}>
            {iconCheck}
          </TouchableOpacity>
        </TouchableView>,
      );
    });
    return contentsButton;
  }

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

  setRadioCheck(check, index) {
    let newIsCheck = this.state.isCheck;
    newIsCheck[index] = check;
    this.setState({ isCheck: newIsCheck });
  }

  render() {
    const { header, contents, actions } = this.props;
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
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <View style={styles.cardModalContainer}>
              <View style={styles.headerContainer}>
                <Text bold style={styles.headerText}>
                  {header}
                </Text>
              </View>

              <View style={styles.contentContainer}>
                {this._renderContents(contents)}
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
          <Text>Show Filter Modal</Text>
        </TouchableView>
      </View>
    );
  }
}

export default FilterModal;
