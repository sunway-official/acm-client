import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import {
  addHeaderOptions,
  toggleHeader,
  toggleFooter,
} from '~/Redux/Toolbar/action';
import styles from './styles';
import { Colors, Images } from '~/Theme';

import Dialog from '~/Component/Dialog';
import FilterModal from '~/Component/FilterModal';
import TouchableView from '~/Component/TouchableView';
import Modal from '~/Component/Modal';

const text = ['Welcome to News Feed!', 'We are under developement.'];

class NewsFeedScene extends Component {
  state = {
    isModalVisible: false,
  };
  _showModal = () => this.setState({ isModalVisible: true });
  _hideModal = () => this.setState({ isModalVisible: false });

  render() {
    const { home } = this.props;

    console.log(this.props);

    return (
      <View style={styles.container}>
        <Button
          title="Hide navigation"
          onPress={() => {
            this.props.toggleHeader();
            this.props.toggleFooter();
          }}
        />
        <View style={styles.centerText}>
          {text.map((text, index) =>
            <Text key={index}>
              {text}
            </Text>,
          )}
        </View>
        <Button title="Home" onPress={home} />

        <TouchableView onPress={this._showModal}>
          <Text>Show Modal</Text>
        </TouchableView>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={this._hideModal}
        >
          <View>
            <Text>Hello!</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

NewsFeedScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.blue,
  statusBarBackgroundColor: Colors.blue,
  actions: [
    {
      icon: {},
      onPress: () => {
        console.log('hello there');
      },
    },
  ],
};

NewsFeedScene.footer = {
  show: true,
  activeColor: Colors.blue,
};

NewsFeedScene.propTypes = {
  home: PropTypes.func,
  setTitle: PropTypes.func,
  toggleHeader: PropTypes.func,
  toggleFooter: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
  setTitle: title => dispatch(addHeaderOptions({ title })),
  toggleHeader: () => dispatch(toggleHeader()),
  toggleFooter: () => dispatch(toggleFooter()),
});

export default connect(undefined, mapDispatchToProps)(NewsFeedScene);
