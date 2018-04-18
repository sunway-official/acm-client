import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { graphql, gql } from 'react-apollo';
import { Text, TouchableView, UserProfileBody } from 'Component';
import { Colors } from 'Theme';
import Content from './Content';
import styles from './styles';
import { FOLLOWERS, FOLLOWING } from '../fixture';
import QUERY_ACTIVITIES from 'Graphql/query/getNewsByUserID.graphql';

// const TABS = {
//   About: {
//     title: 'About',
//     icon: {
//       name: 'person',
//     },
//   },
//   Activities: {
//     title: 'Posts',
//     quantity: 0,
//   },
//   Followers: {
//     title: 'Followers',
//     quantity: FOLLOWERS.length,
//   },
//   Following: {
//     title: 'Following',
//     quantity: FOLLOWING.length,
//   },
// };
// const INITIAL_TAB = 'About';

class Body extends Component {
  static propTypes = {
    user: PropTypes.object,
    data: PropTypes.shape({
      getNewsByUserID: PropTypes.array,
      loading: PropTypes.bool,
      refetch: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    // this.state = {
    //   tabs: {},
    //   currentTab: {},
    // };
    // this._renderTab = this._renderTab.bind(this);
    // this._renderContent = this._renderContent.bind(this);
    // this._onPress = this._onPress.bind(this);
  }

  // componentWillMount() {
  //   // refetch Activities
  //   this.props.data.refetch();
  //
  //   // set initial tab
  //   this.setState({
  //     currentTab: { ...TABS[INITIAL_TAB] },
  //     tabs: {
  //       ...TABS,
  //       [INITIAL_TAB]: {
  //         ...TABS[INITIAL_TAB],
  //         initial: true,
  //       },
  //     },
  //   });
  // }
  //
  // _onPress(tab, tabKey) {
  //   this.setState({
  //     currentTab: { ...tab },
  //     tabs: {
  //       ...TABS,
  //       [tabKey]: { ...TABS[tabKey], isActive: true },
  //     },
  //   });
  // }

  // _renderTab(tab, key, index) {
  //   return (
  //     <TouchableView
  //       rippleColor="rgba(0,0,0,0.05)"
  //       style={[
  //         styles.tabContainer,
  //         tab.isActive || tab.initial
  //           ? { borderBottomColor: Colors.black }
  //           : { borderBottomColor: 'transparent' },
  //       ]}
  //       key={index}
  //       onPress={() => this._onPress(tab, key)}
  //     >
  //       {tab.icon && <Icon name={tab.icon.name} type={tab.icon.type} />}
  //       {tab.quantity !== undefined && (
  //         <Text style={styles.numberStyle}>{tab.quantity}</Text>
  //       )}
  //       <Text style={styles.secondaryText}>{tab.title}</Text>
  //     </TouchableView>
  //   );
  // }

  // _renderContent() {
  //   const {
  //     state: { currentTab },
  //     props: { user },
  //   } = this;
  //   return <Content tab={currentTab.title} user={user} />;
  // }

  render() {
    // const { tabs } = this.state;
    const { user, data: { getNewsByUserID, loading, refetch } } = this.props;
    return (
      <UserProfileBody
        user={user}
        getNewsByUserID={getNewsByUserID}
        loading={loading}
        refetch={() => refetch()}
        enableReview
      />
      // <View style={styles.container}>
      //   <View style={styles.tabsContainer}>
      //     {Object.keys(tabs).map((key, index) => {
      //       tabs['Activities'].quantity =
      //         getNewsByUserID === undefined
      //           ? tabs[key].quantity
      //           : getNewsByUserID.length;
      //       return this._renderTab(tabs[key], key, index);
      //     })}
      //   </View>
      //   {this._renderContent()}
      // </View>
    );
  }
}

export default graphql(gql(QUERY_ACTIVITIES), {
  options: ownProps => ({
    variables: {
      user_id: ownProps.user.id,
      notifyOnNetworkStatusChange: true,
    },
  }),
})(Body);
