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
  title: 'Dung Le',
  hideTitle: false,
  backgroundColor: Colors.red,
  statusBarBackgroundColor: Colors.red,
};

const SECONDARY_HEADER = {
  hideTitle: true,
  backgroundColor: Colors.transparent,
  statusBarBackgroundColor: 'rgba(0,0,0,0.3)',
};

class ProfileScene extends Component {
  static header = {
    leftIcon: 'drawer',
    hideTitle: true,
    float: true,
    theme: 'dark',
    backgroundColor: Colors.transparent,
    statusBarBackgroundColor: 'rgba(0,0,0,0.3)',
    actions: [
      {
        icon: {
          name: 'lead-pencil',
          type: 'material-community',
        },
        onPress: dispatch =>
          dispatch(NavigationActions.navigate({ routename: 'profileEditing' })),
      },
    ],
  };

  static footer = {
    show: true,
    activeColor: Colors.red,
  };

  static propTypes = {
    setCustomHeader: PropTypes.func,
    data: PropTypes.shape({
      loading: PropTypes.bool,
    }),
  };

  constructor(props) {
    super(props);
    this._handleScrollToBottom = this._handleScrollToBottom.bind(this);
  }

  _handleScrollToBottom(e) {
    const y = e.nativeEvent.contentOffset.y;
    if (y > 150) {
      this.props.setCustomHeader(PRIMARY_HEADER);
    } else {
      this.props.setCustomHeader(SECONDARY_HEADER);
    }
  }

  render() {
    const { data: { me } } = this.props;
    return (
      <ScrollView
        scrollEventThrottle={16}
        onScroll={e => this._handleScrollToBottom(e)}
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

const mapDispatchToProps = dispatch => ({
  setCustomHeader: header => dispatch(addHeaderOptions(header)),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(query)),
)(ProfileScene);
