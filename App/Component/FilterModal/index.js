import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

import TouchableView from '../TouchableView';
import Text from '../Text';
import Modal from '../Modal';

import { Icon } from 'react-native-elements';
import { Colors, Fonts } from '~/Theme/';

const dummyContents = ['Leadership', 'Citizen Tech', 'Program Assessment'];

class FilterModal extends Component {
  state = {
    isCheck: Array(dummyContents.length).fill(false),
  };

  static propTypes = {
    isVisible: PropTypes.bool,
    onBackdropPress: PropTypes.func,
    onCancelPress: PropTypes.func,
    contents: PropTypes.array,
  };

  static defaultProps = {
    isVisible: false,
    onBackdropPress: () => null,
    onCancelPress: () => null,
  };

  // ! using composition for content filter
  _renderContents(contents) {
    var contentsButton = [];
    var isCheck = this.state.isCheck;

    contents.map((content, index) => {
      var isPress =
        isCheck[index] === true ? { color: Colors.deepOrange } : null;

      contentsButton.push(
        <TouchableView
          key={index}
          rippleColor={Colors.grey}
          style={styles.itemSortByContainer}
          onPress={() => this.setOnPress(!isCheck[index], index)}
        >
          <View>
            <Text style={[styles.itemSortByText, isPress]}>
              {content}
            </Text>
          </View>
        </TouchableView>,
      );
    });
    return contentsButton;
  }

  //! using composition for actions button
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
  //         <Text medium style={styles.actionText}>
  //           {action.name}
  //         </Text>
  //       </TouchableView>,
  //     );
  //   });
  //   return actionsButton;
  // }

  _renderHeader = onCancelPress =>
    <View style={styles.headerContainer}>
      <TouchableView onPress={onCancelPress}>
        <Text light style={styles.actionHeaderText}>
          Cancel
        </Text>
      </TouchableView>
      <Text bold style={styles.headerText}>
        Filter
      </Text>
      <TouchableView onPress={() => this.setPressToDefault()}>
        <Text light style={styles.actionHeaderText}>
          Reset
        </Text>
      </TouchableView>
    </View>;

  _renderButton = () =>
    <TouchableView style={styles.actionContainer} onPress={() => null}>
      <Text medium style={styles.actionSubmitText}>
        Save Filter
      </Text>
    </TouchableView>;

  setOnPress(check, index) {
    let newIsCheck = this.state.isCheck;
    newIsCheck[index] = check;
    this.setState({ isCheck: newIsCheck });
  }

  setPressToDefault() {
    this.setState({ isCheck: Array(dummyContents.length).fill(false) });
  }

  render() {
    const contents = dummyContents;
    const { isVisible, onBackdropPress, onCancelPress } = this.props;
    return (
      <Modal
        animationIn="zoomIn"
        animationOut="zoomOut"
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
        style={styles.container}
      >
        <View style={styles.cardModalContainer}>
          {this._renderHeader(onCancelPress)}

          <View style={styles.contentContainer}>
            <Text light>Sort my results by</Text>
            <View style={styles.sortByContainer}>
              {this._renderContents(contents)}
            </View>
          </View>

          {this._renderButton()}
        </View>
      </Modal>
    );
  }
}

export default FilterModal;
