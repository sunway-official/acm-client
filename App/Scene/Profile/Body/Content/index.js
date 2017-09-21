import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import About from './About';
import Activities from './Activities';
import Followers from './Followers';
import Following from './Following';
import styles from './styles';

const withAnimation = Tab =>
  <AnimatableView animation="fadeIn" duaration={300}>
    <Tab />
  </AnimatableView>;

class Content extends Component {
  static propTypes = { tab: PropTypes.string };

  constructor(props) {
    super(props);
    this._renderContent = this._renderContent.bind(this);
  }

  _renderContent(tab) {
    switch (tab) {
      case 'About':
        return withAnimation(About);
      case 'Posts':
        return withAnimation(Activities);
      case 'Followers':
        return withAnimation(Followers);
      case 'Following':
        return withAnimation(Following);
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
