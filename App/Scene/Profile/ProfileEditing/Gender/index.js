import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { Modal, Text } from '~/Component';
import { setModalState } from '~/Redux/Modal';
import styles from './styles';

const data = [
  {
    name: 'Male',
    value: 'male',
  },
  {
    name: 'Female',
    value: 'female',
  },
];

class GenderForm extends Component {
  static propTypes = {
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    input: PropTypes.shape({
      value: PropTypes.any,
      onChange: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this._renderModal = this._renderModal.bind(this);
    this._openModal = this._openModal.bind(this);
    this._hideModal = this._hideModal.bind(this);
    this._onCheck = this._onCheck.bind(this);
  }

  _openModal() {
    this.setState({ isOpen: true });
    this.props.showModal();
  }

  _hideModal() {
    this.setState({ isOpen: false });
    this.props.hideModal();
  }

  _onCheck(index) {
    const { props: { input: { onChange } } } = this;

    onChange(data[index]);

    setTimeout(this._hideModal, 200);
  }

  _renderModal() {
    const { state: { isOpen } } = this;
    return (
      <Modal
        isVisible={isOpen}
        animationIn="zoomIn"
        animationOut="zoomOut"
        onBackdropPress={() => this._hideModal()}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          {data.map((gender, index) =>
            <View key={index} style={styles.subContent}>
              <Text>
                {gender.name}
              </Text>
              <TouchableOpacity onPress={() => this._onCheck(index)}>
                <Icon
                  name={gender.check ? 'radiobox-marked' : 'radiobox-blank'}
                  type="material-community"
                />
              </TouchableOpacity>
            </View>,
          )}
        </View>
      </Modal>
    );
  }

  render() {
    const { props: { input: { value }, ...othersProps } } = this;
    // console.log(this.props);

    return (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() => this._openModal()}>
          <TextInput value={value.name} {...othersProps} />
        </TouchableOpacity>
        {this._renderModal()}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(setModalState(true)),
  hideModal: () => dispatch(setModalState(false)),
});

export default connect(undefined, mapDispatchToProps)(GenderForm);
