import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, TouchableView } from '~/Component';
import { Colors } from '../../../Theme';
import Content from './Content';
import styles from './styles';
import { news, followers } from '../fixture';

class Body extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

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
          icon: {
            name: 'person',
          },
        },
        Activities: {
          title: 'Posts',
          isActive: false,
          quantity: news.length,
        },
        Followers: {
          title: 'Followers',
          isActive: false,
          quantity: followers.length,
        },
        Following: {
          title: 'Following',
          isActive: false,
          quantity: followers.length,
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
        rippleColor="rgba(0,0,0,0.05)"
        style={[
          styles.tabContainer,
          tab.isActive || tab.initial
            ? { borderBottomColor: Colors.black }
            : { borderBottomColor: 'transparent' },
        ]}
        key={index}
        onPress={() => this._handlePress(key)}
      >
        {tab.icon && <Icon name={tab.icon.name} type={tab.icon.type} />}
        {tab.quantity !== undefined &&
          <Text style={styles.numberStyle}>
            {tab.quantity}
          </Text>}
        <Text style={styles.secondaryText}>
          {tab.title}
        </Text>
      </TouchableView>
    );
  }

  _renderContent() {
    const { tabs } = this.state;
    const { user } = this.props;
    let tab = '';
    Object.keys(tabs).forEach(key => {
      if (tabs[key].isActive || tabs[key].initial) {
        tab = tabs[key].title;
      }
    });
    return <Content tab={tab} user={user} />;
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
