import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import About from './About';
import Activities from './Activities';
import Followers from './Followers';
import styles from './styles';

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
      case 'Activities':
        return <Activities />;
      case 'Followers':
        return <Followers />;
      default:
        return <View />;
    }
  }

  render() {
    const { tab } = this.props;
    return (
      <View style={styles.container}>
        {this._renderContent(tab)}
      </View>
    );
  }
}

export default Content;
