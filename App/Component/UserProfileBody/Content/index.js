import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { AnimatableView } from 'Component';
import About from './About/index';
import Activities from './Activities/index';
import Followers from './Followers/index';
import Following from './Following/index';
import styles from './styles';

const withAnimation = (Tab, userQuery, enableReview = false, data) => (
  <AnimatableView animation="fadeIn" duaration={300}>
    <Tab userQuery={userQuery} enableReview={enableReview} tabContent={data} />
  </AnimatableView>
);

class Content extends Component {
  static propTypes = {
    tab: PropTypes.string,
    userQuery: PropTypes.object,
    activitiesQuery: PropTypes.object,
    enableReview: PropTypes.bool,
    followers: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this._renderContent = this._renderContent.bind(this);
  }

  _renderContent(tab) {
    const { userQuery, activitiesQuery, enableReview, followers } = this.props;

    switch (tab) {
      case 'About':
        return withAnimation(About, userQuery, enableReview);
      case 'Posts':
        return withAnimation(Activities, userQuery, null, activitiesQuery);
      case 'Followers':
        return withAnimation(Followers, undefined, null, followers);
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
