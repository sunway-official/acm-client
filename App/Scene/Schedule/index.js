import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { KEY, setModalState } from '~/Redux/Modal';

import { Colors } from '~/Theme';
import DefaultTabBar from './CustomTabBar/DefaultTabBar';
import FilterModal from '~/Component/FilterModal';

import Agenda from './Agenda';
import MyAgenda from './MyAgenda';

class ScheduleScene extends Component {
  static propTypes = {
    showFilterModal: PropTypes.func,
    hideFilterModal: PropTypes.func,
    toggleModal: PropTypes.func,
    modal: PropTypes.object,
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

ScheduleScene.header = {
  actions: [
    {
      icon: {
        name: 'filter-list',
      },
      onPress: dispatch => {
        dispatch(setModalState(true));
      },
    },
  ],
};

ScheduleScene.footer = {
  show: true,
  activeColor: Colors.black,
};

const mapStateToProps = state => ({
  modal: state[KEY],
});

const mapDispatchToProps = dispatch => ({
  showFilterModal: () => dispatch(setModalState(true)),
  hideFilterModal: () => dispatch(setModalState(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScene);
