import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { AnimatableView } from 'Component';
import About from './About/index';
import Activities from './Activities/index';
import Followers from './Followers/index';
import Following from './Following/index';
import styles from './styles';

const withAnimation = (Tab, user, enableReview) => (
  <AnimatableView animation="fadeIn" duaration={300}>
    <Tab user={user} enableReview={enableReview} />
  </AnimatableView>
);

class Content extends Component {
  static propTypes = {
    tab: PropTypes.string,
    user: PropTypes.object,
    enableReview: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this._renderContent = this._renderContent.bind(this);
  }

  _renderContent(tab) {
    const { user, enableReview } = this.props;
    switch (tab) {
      case 'About':
        return withAnimation(About, user, enableReview);
      case 'Posts':
        return withAnimation(Activities, user);
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
    return <View style={styles.container}>{this._renderContent(tab)}</View>;
  }
}

export default Content;
