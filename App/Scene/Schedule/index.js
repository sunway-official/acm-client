import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { KEY, setModalState, toggleModal } from '~/Redux/Modal';

import { Colors } from '~/Theme';
import Text from '~/Component/Text';
import DefaultTabBar from './CustomTabBar/DefaultTabBar';
import TouchableView from '~/Component/TouchableView';
import FilterModal from '~/Component/FilterModal';

import Agenda from './Agenda';
import MyAgenda from './MyAgenda';

class Schedule extends Component {
  static propTypes = {
    showFilterModal: PropTypes.func,
    hideFilterModal: PropTypes.func,
    toggleModal: PropTypes.func,
    modal: PropTypes.object,
  };

  state = {
    isFilterOpen: false,
  };

  static header = {
    actions: [
      {
        icon: {},
        onPress: dispatch => {
          console.log('hello there');
          dispatch({
            type: 'REDUX_ACTION',
            payload: "Hello! I'm here",
          });
        },
      },
      {
        icon: {
          name: 'filter-list',
        },
        // onPress: dispatch => {
        //   dispatch({
        //     type: 'LOCK_ACTION',
        //     payload: 'Lock the account',
        //   });
        // },
        onPress: dispatch => {
          dispatch(setModalState(true));
        },
      },
    ],
  };

  // componentWillReceiveProps(nextProps) {
  //   // console.log(nextProps);
  //   console.log(nextProps.modal.isOpen);
  //   const isOpen = nextProps.modal.isOpen;
  //   if (isOpen) {
  //     this._renderFilter();
  //   }
  // }

  static footer = {
    show: true,
    activeColor: Colors.black,
  };

  _renderFilter = isOpen =>
    <FilterModal
      isVisible={isOpen}
      onBackdropPress={() => this.props.hideFilterModal()}
      onCancelPress={() => this.props.hideFilterModal()}
    />;

  render() {
    const isFilterOpen = this.props.modal.isOpen;
    return (
      <View style={{ flex: 1 }}>
        {this._renderFilter(isFilterOpen)}
        <ScrollableTabView
          locked={true}
          renderTabBar={() =>
            <DefaultTabBar
              tabStyle={{ paddingBottom: 0 }}
              activeTabBackgroundColor={Colors.black}
              activeTextColor="white"
              inactiveTabBackgroundColor="white"
              underlineStyle={{ height: 0 }}
            />}
        >
          <Agenda tabLabel="Agenda" />
          <MyAgenda tabLabel="My Agenda" />
        </ScrollableTabView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  modal: state[KEY],
});

const mapDispatchToProps = dispatch => ({
  showFilterModal: () => dispatch(setModalState(true)),
  hideFilterModal: () => dispatch(setModalState(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
