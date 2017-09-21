import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

import TouchableView from '../TouchableView';
import Text from '../Text';
import Modal from '../Modal';

import { Icon } from 'react-native-elements';
import { Colors, Fonts } from '~/Theme/';
const randomColor = ['red', 'blue', 'green', 'pink'];

class FilterModal extends Component {
  state = {
    // isCheck: Array(this.props.contents.length).fill(false),
  };

  static propTypes = {
    isVisible: PropTypes.bool,
    onBackdropPress: PropTypes.func,
    onCancelPress: PropTypes.func,
    // children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    isVisible: false,
    onBackdropPress: () => null,
  };

  // ! using composition for content filter
  // _renderContents(contents) {
  //   var contentsButton = [];
  //   var isCheck = this.state.isCheck;

  //   contents.map((content, index) => {
  //     var iconCheck =
  //       isCheck[index] === true
  //         ? <Icon name={'md-radio-button-on'} type={'ionicon'} size={15} />
  //         : <Icon name={'md-radio-button-off'} type={'ionicon'} size={15} />;

  //     contentsButton.push(
  //       <TouchableView
  //         key={index}
  //         rippleColor={Colors.grey}
  //         style={[
  //           styles.filterContentContainer,
  //           { borderLeftColor: randomColor[index] },
  //         ]}
  //         onPress={() => this.setRadioCheck(!isCheck[index], index)}
  //       >
  //         <View>
  //           <Text>
  //             {content.name}
  //           </Text>
  //         </View>
  //         <TouchableOpacity style={styles.filterContentIcon}>
  //           {iconCheck}
  //         </TouchableOpacity>
  //       </TouchableView>,
  //     );
  //   });
  //   return contentsButton;
  // }

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

  setRadioCheck(check, index) {
    let newIsCheck = this.state.isCheck;
    newIsCheck[index] = check;
    this.setState({ isCheck: newIsCheck });
  }

  render() {
    const { isVisible, onBackdropPress, onCancelPress } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
        style={styles.container}
      >
        <View style={styles.cardModalContainer}>
          <View style={styles.headerContainer}>
            <TouchableView onPress={onCancelPress}>
              <Text light style={styles.actionHeaderText}>
                Cancel
              </Text>
            </TouchableView>
            <Text bold style={styles.headerText}>
              Filter
            </Text>
            <Text light style={styles.actionHeaderText}>
              Reset
            </Text>
          </View>

          <View style={styles.contentContainer}>
            <Text light>Sort my results by</Text>
            <View style={styles.sortByContainer}>
              <TouchableView
                rippleColor={Colors.grey}
                style={styles.itemSortByContainer}
              >
                <Text style={styles.itemSortByText}>Leadership</Text>
              </TouchableView>

              <TouchableView
                rippleColor={Colors.grey}
                style={styles.itemSortByContainer}
              >
                <Text
                  style={[styles.itemSortByText, { color: Colors.deepOrange }]}
                >
                  Citizen Tech
                </Text>
              </TouchableView>

              <TouchableView
                rippleColor={Colors.grey}
                style={styles.itemSortByContainer}
              >
                <Text style={styles.itemSortByText}>Program Assessment</Text>
              </TouchableView>
            </View>
          </View>

          <TouchableView style={styles.actionContainer} onPress={() => null}>
            <Text medium style={styles.actionSubmitText}>
              Save Filter
            </Text>
          </TouchableView>
        </View>
      </Modal>
    );
  }
}

export default FilterModal;
