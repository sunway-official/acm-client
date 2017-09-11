import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { Metrics, Colors } from '~/Theme';
import { Text, TouchableView } from '~/Component';
import Content from './Content';
import styles from './styles';

// const TabsView = TabNavigator(
//   {
//     About: { screen: About },
//     Activity: { screen: Activity },
//     Networking: { screen: Networking },
//   },
//   {
//     tabBarComponent: TabBarTop,
//     tabBarPosition: 'top',
//     swipeEnabled: true,
//     animationEnabled: true,
//     tabBarOptions: {
//       indicatorStyle: {
//         backgroundColor: 'black',
//       },
//       style: {
//         backgroundColor: 'white',
//       },
//       labelStyle: { margin: 0, color: Colors.black },
//       upperCaseLabel: false,
//     },
//   },
// );

class Body extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._renderTab = this._renderTab.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._handlePress = this._handlePress.bind(this);
    this._resetState = this._resetState.bind(this);
  }

  _getInitialState() {
    const initialState = {
      tabs: {
        About: {
          title: 'About',
          isActive: false,
          initial: true,
        },
        Activity: {
          title: 'Activity',
          isActive: false,
        },
        Networking: {
          title: 'Networking',
          isActive: false,
        },
      },
    };
    return initialState;
  }

  _resetState(callbackFunc) {
    this.setState(
      {
        ...this._getInitialState(),
        tabs: {
          ...this._getInitialState().tabs,
          About: {
            ...this._getInitialState().tabs.About,
            initial: false,
          },
        },
      },
      callbackFunc,
    );
  }

  _handlePress(tab) {
    this._resetState(() => {
      this.setState({
        tabs: {
          ...this.state.tabs,
          [tab]: {
            ...this.state.tabs[tab],
            isActive: true,
          },
        },
      });
    });
  }

  _renderTab(key, index) {
    const tab = this.state.tabs[key];
    return (
      <TouchableView
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 8,
            borderBottomWidth: 2,
          },
          tab.isActive || tab.initial
            ? { borderBottomColor: 'black' }
            : { borderBottomColor: 'transparent' },
        ]}
        key={index}
        onPress={() => this._handlePress(key)}
      >
        <Text>
          {tab.title}
        </Text>
      </TouchableView>
    );
  }

  _renderContent() {
    let tab = '';
    Object.keys(this.state.tabs).forEach(key => {
      if (this.state.tabs[key].isActive || this.state.tabs[key].initial) {
        tab = this.state.tabs[key].title;
      }
    });
    return <Content tab={tab} />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}
        >
          {Object.keys(this.state.tabs).map((key, index) =>
            this._renderTab(key, index),
          )}
        </View>
        {this._renderContent()}
      </View>
    );
  }
}

export default Body;
