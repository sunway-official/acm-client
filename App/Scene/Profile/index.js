import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '~/Theme';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import ProfileHeader from './Header';
import ProfileBody from './Body';
import { defaultUserAvatar } from './fixture';
import { NavigationActions } from '~/Redux/Navigation';
import query from '~/Graphql/query/me.graphql';

const PRIMARY_HEADER = {
  hideTitle: false,
  backgroundColor: Colors.red,
  statusBarBackgroundColor: Colors.red,
};

const SECONDARY_HEADER = {
  hideTitle: true,
  backgroundColor: Colors.transparent,
  statusBarBackgroundColor: Colors.transparent,
};

class ProfileScene extends Component {
  static propTypes = {
    setCustomHeader: PropTypes.func,
    data: PropTypes.shape({
      loading: PropTypes.bool,
    }),
  };

  constructor(props) {
    super(props);
    this._handleScrolling = this._handleScrollToBottom.bind(this);
  }

  _handleScrolling(e) {
    const { data: { me }, setCustomHeader } = this.props;
    const y = e.nativeEvent.contentOffset.y;
    if (y > 150) {
      setCustomHeader({
        ...PRIMARY_HEADER,
        title: `${me.firstname} ${me.lastname}`,
      });
    } else {
      setCustomHeader(SECONDARY_HEADER);
    }
  }

  componentDidUpdate() {
    // For navigate back to Profile scene
    this._handleScrolling();
  }

  render() {
    const { data: { me } } = this.props;

    return (
      <ScrollView
        scrollEventThrottle={16}
        onScroll={e => this._handleScrolling(e)}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        overScrollMode={'never'}
      >
        <ProfileHeader
          avatar={defaultUserAvatar}
          user={me}
          address="Duy Tan University"
        />
        <ProfileBody user={me} />
      </ScrollView>
    );
  }
}

ProfileScene.header = {
  leftIcon: 'drawer',
  hideTitle: true,
  float: true,
  theme: 'dark',
  backgroundColor: Colors.transparent,
  statusBarBackgroundColor: Colors.transparent,
  menu: {
    icon: {
      name: 'lead-pencil',
      type: 'material-community',
    },
    actions: [
      {
        title: 'Change password',
        icon: {
          name: 'lock-outline',
          // type: 'material-community',
        },
        onPress: dispatch =>
          dispatch(NavigationActions.navigate({ routeName: 'changePassword' })),
      },
      {
        title: 'Update Information',
        icon: {
          name: 'account-box',
          // type: 'material-community',
        },
        onPress: dispatch =>
          dispatch(NavigationActions.navigate({ routeName: 'editProfile' })),
      },
    ],
  },
};

ProfileScene.footer = {
  show: true,
  activeColor: Colors.red,
};

const mapDispatchToProps = dispatch => ({
  setCustomHeader: header => dispatch(addHeaderOptions(header)),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(query)),
)(ProfileScene);
