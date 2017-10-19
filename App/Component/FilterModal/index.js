import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './style';

import TouchableView from '../TouchableView';
import Text from '../Text';
import Modal from '../Modal';

import { Colors } from '~/Theme/';

const dummyContents = [
  'Leadership',
  'Citizen Tech',
  'Program Assessment',
  'Academic',
  'Technology',
  'Biology',
  'Leadership',
  'Citizen Tech',
  'Program Assessment',
  'Academic',
  'Technology',
  'Biology',
];

const closeIcon = {
  type: 'evilicon',
  name: 'close',
  color: Colors.black,
  size: 20,
};

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
      var textColorPress = isCheck[index] ? { color: Colors.deepOrange } : null;
      var borderColorPress = isCheck[index]
        ? { borderColor: Colors.deepOrange }
        : null;

      contentsButton.push(
        <TouchableView
          key={index}
          rippleColor={Colors.primary}
          style={styles.itemSortByContainer}
          onPress={() => this.setOnPress(!isCheck[index], index)}
        >
          <Text
            style={[styles.itemSortByText, textColorPress, borderColorPress]}
          >
            {content}
          </Text>
        </TouchableView>,
      );
    });
    return contentsButton;
  }

  _renderHeader = onCancelPress => (
    <View style={styles.headerContainer}>
      <View>
        <Text light style={styles.headerText}>
          Filters
        </Text>
      </View>
      <TouchableView onPress={onCancelPress}>
        <Icon
          name={closeIcon.name}
          type={closeIcon.type}
          color={closeIcon.color}
          size={closeIcon.size}
        />
      </TouchableView>
    </View>
  );

  _renderButton = onCancelPress => (
    <View style={styles.actionContainer}>
      <TouchableView style={styles.actionSubmitText} onPress={onCancelPress}>
        <Text style={styles.actionText}>Cancel</Text>
      </TouchableView>
      <TouchableView
        style={styles.actionSubmitText}
        onPress={() => this.setPressToDefault()}
      >
        <Text style={styles.actionText}>Reset</Text>
      </TouchableView>
      <TouchableView style={styles.actionSubmitText} onPress={() => null}>
        <Text style={styles.actionText}>Apply</Text>
      </TouchableView>
    </View>
  );

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
            <ScrollView>
              <View style={styles.descriptionSortByContainer}>
                <Text>Sort my results by</Text>
              </View>
              <View style={styles.sortByContainer}>
                {this._renderContents(contents)}
              </View>
            </ScrollView>
          </View>

          {this._renderButton(onCancelPress)}
        </View>
      </Modal>
    );
  }
}

export default FilterModal;
