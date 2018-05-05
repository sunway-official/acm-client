import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, TouchableView } from 'Component';
import { Colors } from 'Theme';
import Content from './Content/index';
import styles from './styles';

const TABS = {
  About: {
    title: 'About',
    icon: {
      name: 'person',
    },
  },
  Activities: {
    title: 'Posts',
    quantity: 0,
  },
  Followers: {
    title: 'Followers',
    quantity: 0,
  },
  Following: {
    title: 'Following',
    quantity: 0,
  },
};
const INITIAL_TAB = 'About';

class Body extends Component {
  static propTypes = {
    userQuery: PropTypes.any,
    activitiesQuery: PropTypes.any,
    enableReview: PropTypes.bool,
    enableFollowUser: PropTypes.bool,
    followersQuery: PropTypes.object,
    followingsQuery: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      tabs: {},
      currentTab: {},
    };
    this._renderTab = this._renderTab.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._onPress = this._onPress.bind(this);
  }

  componentWillMount() {
    // refetch Activities
    this.props.activitiesQuery.refetch();
    this.props.followersQuery.refetch();
    this.props.followingsQuery.refetch();

    // set initial tab
    this.setState({
      currentTab: { ...TABS[INITIAL_TAB] },
      tabs: {
        ...TABS,
        [INITIAL_TAB]: {
          ...TABS[INITIAL_TAB],
          initial: true,
        },
      },
    });
  }

  _onPress(tab, tabKey) {
    this.setState({
      currentTab: { ...tab },
      tabs: {
        ...TABS,
        [tabKey]: { ...TABS[tabKey], isActive: true },
      },
    });
  }

  _renderTab(tab, key, index) {
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
        onPress={() => this._onPress(tab, key)}
      >
        {tab.icon && <Icon name={tab.icon.name} type={tab.icon.type} />}
        {tab.quantity !== undefined && (
          <Text style={styles.numberStyle}>{tab.quantity}</Text>
        )}
        <Text style={styles.secondaryText}>{tab.title}</Text>
      </TouchableView>
    );
  }

  _renderContent() {
    const { currentTab } = this.state;
    const {
      userQuery,
      activitiesQuery,
      enableReview,
      enableFollowUser,
      followersQuery,
      followingsQuery,
    } = this.props;
    return (
      <Content
        tab={currentTab.title}
        userQuery={userQuery}
        activitiesQuery={activitiesQuery}
        enableReview={enableReview}
        enableFollowUser={enableFollowUser}
        followersQuery={followersQuery}
        followingsQuery={followingsQuery}
      />
    );
  }

  render() {
    const { tabs } = this.state;
    const {
      activitiesQuery,
      followersQuery: { getFollowers },
      followingsQuery: { getFollowings },
    } = this.props;

    tabs['Activities'].quantity =
      activitiesQuery.getNewsByUserID && activitiesQuery.getNewsByUserID.length;
    tabs['Followers'].quantity = getFollowers && getFollowers.length;
    tabs['Following'].quantity = getFollowings && getFollowings.length;

    return (
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {Object.keys(tabs).map((key, index) =>
            this._renderTab(tabs[key], key, index),
          )}
        </View>
        {this._renderContent()}
      </View>
    );
  }
}

export default Body;
