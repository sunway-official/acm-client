import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './style';
import { setSelectedTopic, resetSelectedTopics } from 'Reduck/Filter/index';

import TouchableView from '../TouchableView';
import Text from '../Text';
import Modal from '../Modal';

import { Colors } from 'Theme';

const closeIcon = {
  type: 'evilicon',
  name: 'close',
  color: Colors.black,
  size: 24,
};

class FilterModal extends Component {
  constructor(props) {
    super(props);

    const { contents } = this.props;

    this.state = {
      isCheck: Array(contents.length).fill(false),
    };

    this.setOnPress = this.setOnPress.bind(this);
    this.setPressToDefault = this.setPressToDefault.bind(this);
  }

  static defaultProps = {
    isVisible: false,
    onBackdropPress: () => null,
    onCancelPress: () => null,
    onApplyPress: () => null,
  };

  // ! using composition for content filter
  _renderContents(contents) {
    let contentsButton = [];
    let isCheck = this.state.isCheck;

    contents.map((content, index) => {
      let textColorPress = isCheck[index] ? { color: Colors.deepOrange } : null;
      let borderColorPress = isCheck[index]
        ? { borderColor: Colors.deepOrange }
        : null;

      contentsButton.push(
        <TouchableView
          key={index}
          rippleColor={Colors.primary}
          style={styles.itemSortByContainer}
          onPress={() => this.setOnPress(!isCheck[index], index, content)}
        >
          <Text
            style={[styles.itemSortByText, textColorPress, borderColorPress]}
          >
            {content.name}
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

  _renderButton = (onCancelPress, onApplyPress) => (
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
      <TouchableView style={styles.actionSubmitText} onPress={onApplyPress}>
        <Text style={styles.actionText}>Apply</Text>
      </TouchableView>
    </View>
  );

  setOnPress(check, index, content) {
    const { setSelectedTopic } = this.props;

    setSelectedTopic(content);

    let newIsCheck = this.state.isCheck;
    newIsCheck[index] = check;
    this.setState({ isCheck: newIsCheck });
  }

  setPressToDefault() {
    const { contents, resetSelectedTopics } = this.props;
    resetSelectedTopics();
    this.setState({ isCheck: Array(contents.length).fill(false) });
  }

  render() {
    const {
      isVisible,
      contents,
      onBackdropPress,
      onCancelPress,
      onApplyPress,
    } = this.props;
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
          {this._renderButton(onCancelPress, onApplyPress)}
        </View>
      </Modal>
    );
  }
}

FilterModal.propTypes = {
  isVisible: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  onCancelPress: PropTypes.func,
  onApplyPress: PropTypes.func,
  contents: PropTypes.array,
  setSelectedTopic: PropTypes.func,
  selectedTopics: PropTypes.array,
  resetSelectedTopics: PropTypes.func,
};

const mapStateToProps = ({ filter: { selectedTopics } }) => ({
  selectedTopics,
});

const mapDispatchToProps = dispatch => ({
  setSelectedTopic: data => dispatch(setSelectedTopic(data)),
  resetSelectedTopics: () => dispatch(resetSelectedTopics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
