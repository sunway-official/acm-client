import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Modal, Text } from '~/Component';

class Gender extends Component {
  render() {
    return (
      <Modal
        isVisible={true}
        animationIn="zoomIn"
        animationOut="zoomOut"
        onBackdropPress={() => null}
      >
        <View>
          <Text>Male</Text>
          <Icon name="radiobox-marked" type="material-community" />
        </View>
        <View>
          <Text>Female</Text>
          <Icon name="radiobox-blank" type="material-community" />
        </View>
        <View>
          <Text>Other</Text>
          <Icon name="radiobox-blank" type="material-community" />
        </View>
      </Modal>
    );
  }
}

Gender.propTypes = {};

export default Gender;
