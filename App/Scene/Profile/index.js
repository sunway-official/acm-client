import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '~/Theme';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import ProfileHeader from './Header';
import ProfileBody from './Body';
import { defaultUserAvatar } from './fixture';

const PRIMARY_HEADER = {
  title: 'Dung Le',
  hideTitle: false,
  backgroundColor: Colors.red,
  statusBarBackgroundColor: Colors.red,
};

const SECONDARY_HEADER = {
  hideTitle: true,
  backgroundColor: 'rgba(0,0,0,0)',
  statusBarBackgroundColor: Colors.black,
};

class ProfileScene extends Component {
  static header = {
    leftIcon: 'drawer',
    hideTitle: true,
    float: true,
    theme: 'dark',
    backgroundColor: 'rgba(0,0,0,0)',
    statusBarBackgroundColor: Colors.black,
    actions: [
      {
        icon: {
          name: 'lead-pencil',
          type: 'material-community',
        },
        onPress: () => {
          console.log('hello there');
        },
      },
    ],
  };

  static footer = {
    show: true,
    activeColor: Colors.red,
  };

  static propTypes = {
    setCustomHeader: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      animation: false,
    };
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
    return (
      <ScrollView
        scrollEventThrottle={16}
        onScroll={e => this._handleScrollToBottom(e)}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <ProfileHeader
          animation={this.state.animation}
          avatar={defaultUserAvatar}
          username="Dung Le"
          address="Duy Tan University"
        />
        <ProfileBody />
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCustomHeader: header => dispatch(addHeaderOptions(header)),
});

export default connect(undefined, mapDispatchToProps)(ProfileScene);
