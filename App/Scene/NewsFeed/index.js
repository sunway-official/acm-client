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
import { KEY, setModalState } from '~/Redux/Modal';
import styles from './styles';
import { Colors, Images } from '~/Theme';

import TouchableView from '~/Component/TouchableView';
import Dialog from '~/Component/Dialog';
import FilterModal from '~/Component/FilterModal';

const text = ['Welcome to News Feed!', 'We are under developement.'];

class NewsFeedScene extends Component {
  state = {
    isDialogVisible: this.props.modal.isOpen,
    isFilterVisible: false,
  };
  _showDialogModal = () => this.props.showDialogModal();
  _hideDialogModal = () => this.props.hideDialogModal();
  _showFilterModal = () => this.setState({ isFilterVisible: true });
  _hideFilterModal = () => this.setState({ isFilterVisible: false });

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.modal.isOpen) {
  //     this.setState({ isDialogVisible: nextProps.modal.isOpen });
  //   }
  // }

  _renderDialogContent = () =>
    <View
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 30,
      }}
    >
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500
      </Text>

      <TouchableView onPress={this._hideDialogModal} style={{ paddingTop: 10 }}>
        <Text>Cancel</Text>
      </TouchableView>
    </View>;

  _renderDialog = isOpen =>
    <TouchableView onPress={this._showDialogModal}>
      <Text>Show Dialog</Text>
      <Dialog
        isVisible={isOpen}
        onBackdropPress={this._hideDialogModal}
        header="Are you sure?"
      >
        {this._renderDialogContent()}
      </Dialog>
    </TouchableView>;

  _renderFilter = () =>
    <TouchableView onPress={this._showFilterModal}>
      <Text>Show Filter</Text>
      <FilterModal
        isVisible={this.state.isFilterVisible}
        onBackdropPress={this._hideFilterModal}
        onCancelPress={this._hideFilterModal}
      />
    </TouchableView>;

  render() {
    const { home } = this.props;
    console.log(this.props.modal);

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

        {this._renderDialog(this.props.modal.isOpen)}

        {this._renderFilter()}
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
  showDialogModal: PropTypes.func,
  hideDialogModal: PropTypes.func,
  modal: PropTypes.object,
};

const mapStateToProps = state => ({
  modal: state[KEY],
});

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
  setTitle: title => dispatch(addHeaderOptions({ title })),
  toggleHeader: () => dispatch(toggleHeader()),
  toggleFooter: () => dispatch(toggleFooter()),
  showDialogModal: () => dispatch(setModalState(true)),
  hideDialogModal: () => dispatch(setModalState(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedScene);
