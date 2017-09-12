import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableView } from '~/Component';
import Content from './Content';
import styles from './styles';

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
        },
        Activity: {
          title: 'Activity',
          isActive: false,
          initial: true,
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
          styles.tabContainer,
          tab.isActive || tab.initial
            ? { borderBottomColor: 'black' }
            : { borderBottomColor: 'transparent' },
        ]}
        key={index}
        onPress={() => this._handlePress(key)}
      >
        {tab.isActive || tab.initial
          ? <Text bold>
              {tab.title}
            </Text>
          : <Text light>
              {tab.title}
            </Text>}
      </TouchableView>
    );
  }

  _renderContent() {
    const { tabs } = this.state;
    let tab = '';
    Object.keys(tabs).forEach(key => {
      if (tabs[key].isActive || tabs[key].initial) {
        tab = tabs[key].title;
      }
    });
    return <Content tab={tab} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
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
