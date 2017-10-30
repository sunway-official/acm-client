import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { ScrollView } from 'react-native';
import { ImagePicker, ImageCropper } from 'expo';
import { connect } from 'react-redux';
import { Colors } from '~/Theme';
import { S3 } from '~/Provider';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import ProfileHeader from './Header';
import ProfileBody from './Body';
import { DEFAULT_USER_AVATAR } from './fixture';
import { NavigationActions } from '~/Redux/Navigation';
import QUERY_ME from '~/Graphql/query/me.graphql';
import UPDATE_AVATAR from './updateAvatar.graphql';
import { DEFAULT_ME } from './fixture';

const PRIMARY_HEADER = {
  hideTitle: false,
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
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
      me: PropTypes.object,
      refetch: PropTypes.func,
    }),
    header: PropTypes.object,
    updateAvatar: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this._handleScrolling = this._handleScrolling.bind(this);
    this._getUploadAvatarFromFileForHeaderMenuAction = this._getUploadAvatarFromFileForHeaderMenuAction.bind(
      this,
    );
    this._getUploadAvatarFromCameraForHeaderMenuAction = this._getUploadAvatarFromCameraForHeaderMenuAction.bind(
      this,
    );
  }

  componentDidUpdate() {
    const { header: { options }, setCustomHeader } = this.props;
    if (options.menu && options.menu.actions.length === 2) {
      const { menu } = options;
      // Add new menu items
      setCustomHeader({
        menu: {
          ...menu,
          actions: [
            ...menu.actions,
            this._getUploadAvatarFromCameraForHeaderMenuAction(),
            this._getUploadAvatarFromFileForHeaderMenuAction(),
          ],
        },
      });
    }
  }

  _getUploadAvatarFromFileForHeaderMenuAction() {
    const onPress = async () => {
      // Launch Image Picker to pick file
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true, // Required. S3 need base64 source
      });

      if (!result.cancelled) {
        const { uri, base64 } = result;
        // Then put file to S3
        const { Key } = await S3.putAsync({ uri, base64 });
        // Then call a mutatation to save avatar
        await this.props.updateAvatar({
          variables: {
            avatar: Key,
          },
        });
        // Finally refetch QUERY_ME after
        this.props.data.refetch();
      }
    };
    return {
      title: 'Upload Photo',
      icon: {
        name: 'cloud-upload',
      },
      onPress,
    };
  }

  _getUploadAvatarFromCameraForHeaderMenuAction() {
    const onPress = async () => {
      // Launch Image Picker to pick file
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true, // Required. S3 need base64 source
      });

      if (!result.cancelled) {
        const { uri, base64 } = result;
        // Then put file to S3
        const { Key } = await S3.putAsync({ uri, base64 });
        // Then call a mutatation to save avatar
        await this.props.updateAvatar({
          variables: {
            avatar: Key,
          },
        });
        // Finally refetch QUERY_ME after
        this.props.data.refetch();
      }
    };
    return {
      title: 'Take Photo',
      icon: {
        name: 'camera-alt',
      },
      onPress,
    };
  }

  _handleScrolling(e) {
    const { data: { me }, setCustomHeader } = this.props;
    const { y } = e.nativeEvent.contentOffset;
    if (y > 150) {
      setCustomHeader({
        ...PRIMARY_HEADER,
        title: `${me.firstname} ${me.lastname}`,
      });
    } else {
      setCustomHeader(SECONDARY_HEADER);
    }
  }

  render() {
    let { data: { me } } = this.props;
    if (!me) {
      me = DEFAULT_ME;
    }
    return (
      <ScrollView
        scrollEventThrottle={16}
        onScroll={this._handleScrolling}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        overScrollMode={'never'}
      >
        <ProfileHeader avatar={DEFAULT_USER_AVATAR} user={me} />
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
        },
        onPress: dispatch =>
          dispatch(NavigationActions.navigate({ routeName: 'changePassword' })),
      },
      {
        title: 'Update Information',
        icon: {
          name: 'account-box',
        },
        onPress: dispatch =>
          dispatch(NavigationActions.navigate({ routeName: 'profileEditing' })),
      },
    ],
  },
};

ProfileScene.footer = {
  show: true,
  activeColor: Colors.red,
};

const mapStateToProps = state => ({
  header: state['toolbar'].header,
});

const mapDispatchToProps = dispatch => ({
  setCustomHeader: header => dispatch(addHeaderOptions(header)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(gql(QUERY_ME)),
  graphql(gql(UPDATE_AVATAR), {
    name: 'updateAvatar',
  }),
)(ProfileScene);
