import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import About from './About';
import Activities from './Activities';
import Followers from './Followers';
import Following from './Following';
import styles from './styles';

const withAnimation = (Tab, user) =>
  <AnimatableView animation="fadeIn" duaration={300}>
    <Tab user={user} />
  </AnimatableView>;

class Content extends Component {
  static propTypes = { tab: PropTypes.string, user: PropTypes.object };

  constructor(props) {
    super(props);
    this._renderContent = this._renderContent.bind(this);
  }

  _renderContent(tab) {
    const { user } = this.props;
    switch (tab) {
      case 'About':
        return withAnimation(About, user);
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
