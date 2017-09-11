import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import About from './About';
import Activity from './Activity';
import Networking from './Networking';

class Content extends Component {
  static propTypes = { tab: PropTypes.string };

  constructor(props) {
    super(props);
    this._renderContent = this._renderContent.bind(this);
  }

  _renderContent(tab) {
    switch (tab) {
      case 'About':
        return <About />;
      case 'Activity':
        return <Activity />;
      case 'Networking':
        return <Networking />;
      default:
        return (
          <View>
            <Text>Hello</Text>
          </View>
        );
    }
  }

  render() {
    const { tab } = this.props;
    console.log('tab: ', tab);
    return (
      <View>
        {this._renderContent(tab)}
      </View>
    );
  }
}

export default Content;
