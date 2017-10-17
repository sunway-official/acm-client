import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Modal, Text, FormInput } from '~/Component';
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
    const { state: { isOpen }, props: { input: { value } } } = this;
    return (
      <Modal
        isVisible={isOpen}
        animationIn="zoomIn"
        animationOut="zoomOut"
        onBackdropPress={() => this._hideModal()}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          {data.map((gender, index) => (
            <TouchableOpacity
              key={index}
              style={styles.subContent}
              onPress={() => this._onCheck(index)}
            >
              <Text>{gender.name}</Text>
              <Icon
                name={
                  value.value === gender.value
                    ? 'radiobox-marked'
                    : 'radiobox-blank'
                }
                type="material-community"
              />
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    );
  }

  render() {
    const { props: { input: { value }, ...others } } = this;

    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={this._openModal}>
          <FormInput value={value.name} editable={false} {...others} />
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
