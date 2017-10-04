import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { Modal, Text } from '~/Component';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'react-apollo';
import { setModalState } from '~/Redux/Modal';
import styles from './styles';

const data = [
  {
    name: 'male',
    check: true,
  },
  {
    name: 'female',
    check: false,
  },
  {
    name: 'other',
    check: false,
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
      data: data,
      defaultGender: 'male',
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
    const { state: { data }, props: { input: { value, onChange } } } = this;
    let items = [...data];
    items = items.map(item => ({
      ...item,
      check: false,
    }));

    items[index].check = true;

    console.log(this.props);

    this.setState({ data: items, defaultGender: items[index].name });

    setTimeout(this._hideModal, 200);
  }

  _renderModal() {
    const { state: { data, isOpen } } = this;
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
    const { props: { ...othersProps }, state: { defaultGender } } = this;
    return (
      <View>
        <TouchableOpacity activeOpacity={0} onPress={() => this._openModal()}>
          <Field
            name="gender"
            component={() =>
              <TextInput value={defaultGender} {...othersProps} />}
          />
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

export default compose(
  reduxForm({ form: 'genderForm' }),
  connect(undefined, mapDispatchToProps),
)(GenderForm);
