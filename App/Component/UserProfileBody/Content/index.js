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
    followersQuery: PropTypes.object,
    followingsQuery: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._renderContent = this._renderContent.bind(this);
  }

  _renderContent(tab) {
    const {
      userQuery,
      activitiesQuery,
      followersQuery,
      followingsQuery,
      enableReview,
    } = this.props;

    switch (tab) {
      case 'About':
        return withAnimation(About, userQuery, enableReview);
      case 'Posts':
        return withAnimation(Activities, userQuery, false, activitiesQuery);
      case 'Followers':
        return withAnimation(Followers, null, false, followersQuery);
      case 'Following':
        return withAnimation(Following, null, false, followingsQuery);
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
