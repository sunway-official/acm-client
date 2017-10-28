import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { compose, graphql, gql, withApollo } from 'react-apollo';
import { AnimatableView, Text } from '~/Component';
import { IS_DEBUGGING } from '~/env';
import { NavigationActions } from '~/Redux/Navigation';
import { KEY as ROUTES_KEY } from '~/Redux/Routes';
import { KEY as NAVIGATION_KEY } from '~/Redux/Navigation';
import { setDrawerState } from '~/Redux/Drawer';
import { Images, Metrics, Colors } from '~/Theme';
import { query } from '~/Graphql/query/me.graphql';
import styles from './styles';
import MenuItem from './Item';

const USER_FIRSTNAME = 'Sunway';
const USER_LASTNAME = 'Team';
const USER_EMAIL = 'sunway.offical@gmail.com';
const MENU_ITEMS_ANIMATION = 'fadeInUp';
const DROPDOWN_ICON_ANIMATION = 'rotate';
const ANIMATION_DELAY = 300;
const ACTIVE_TOUCHABLE_OPACITY = 0.4;

/* eslint-disable no-unused-vars */
const GENDER_MALE = 'male';
const GENDER_FEMALE = 'female';
const GENDER_UNKNOWN = 'unknown';
/* eslint-enable no-unused-vars */

const DEFAULT_USER = {
  data: {
    firstname: USER_FIRSTNAME,
    lastname: USER_LASTNAME,
    email: USER_EMAIL,
    avatar: null,
  },
};

class Menu extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func,
    navigate: PropTypes.func,
    routes: PropTypes.object,
    navigation: PropTypes.object,
    data: PropTypes.shape({
      me: PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        email: PropTypes.string,
      }),
      error: PropTypes.any,
    }),
    client: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this._renderMenu = this._renderMenu.bind(this);
    this._renderSecondaryMenu = this._renderSecondaryMenu.bind(this);
    this._renderDropdownButton = this._renderDropdownButton.bind(this);
    this._onMenuItemPress = this._onMenuItemPress.bind(this);
    this._renderLogoutMenuItem = this._renderLogoutMenuItem.bind(this);

    this.state = {
      secondaryMenu: false,
    };
  }

  _onMenuItemPress(key) {
    const { routes, index } = this.props.navigation;
    const { routeName } = routes[index];
    if (routeName !== key) {
      this.props.navigate(key);
    }
    this.props.closeDrawer();
  }

  _renderHeaderImage({ avatar, gender }) {
    let defaultAvatar = Images.avatar['male02'];
    switch (gender) {
      case GENDER_MALE:
        defaultAvatar = Images.avatar['male08'];
        break;
      case GENDER_FEMALE:
        defaultAvatar = Images.avatar['female01'];
        break;
    }
    return (
      <View style={styles.headerImage}>
        <Image source={avatar || defaultAvatar} style={styles.profileImage} />
        <Image source={Images.default.img50} style={styles.conferenceImage} />
      </View>
    );
  }

  _renderDropdownButton() {
    let icon = null; // AnimatableView ref
    const onPress = () => {
      if (!IS_DEBUGGING) {
        icon[DROPDOWN_ICON_ANIMATION](ANIMATION_DELAY * 2);
      }
      this.setState({
        secondaryMenu: !this.state.secondaryMenu,
      });
    };
    return (
      <View style={styles.dropdownButtonWrapper}>
        <TouchableOpacity
          style={styles.dropdownButtonTouchableView}
          onPress={onPress}
          activeOpacity={ACTIVE_TOUCHABLE_OPACITY}
        >
          <AnimatableView ref={ref => (icon = ref)}>
            <Icon
              color={Colors.white}
              size={Metrics.icons.small}
              name="arrow-drop-down"
              type="material-icons"
            />
          </AnimatableView>
        </TouchableOpacity>
      </View>
    );
  }

  _withWrapper(element) {
    return (
      <AnimatableView
        animation={MENU_ITEMS_ANIMATION}
        duration={ANIMATION_DELAY}
      >
        {element}
      </AnimatableView>
    );
  }

  _renderMenu() {
    const routes = this.props.routes;

    let items = [];
    Object.keys(routes).map(key => {
      const { name, icon, drawer } = routes[key];
      if (drawer && drawer.primary) {
        items.push(
          <MenuItem
            key={key}
            name={name}
            icon={icon}
            onPress={() => this._onMenuItemPress(key)}
          />,
        );
      }
    });
    return this._withWrapper(items);
  }

  _renderSecondaryMenu() {
    const routes = this.props.routes;

    let items = [];
    Object.keys(routes).map(key => {
      const { name, icon, drawer } = routes[key];
      if (drawer && drawer.secondary) {
        items.push(
          <MenuItem
            key={key}
            name={name}
            icon={icon}
            onPress={() => this._onMenuItemPress(key)}
          />,
        );
      }
    });
    items.push(this._renderLogoutMenuItem());
    return this._withWrapper(items);
  }
  /**
   * Handle logout
   */
  _renderLogoutMenuItem() {
    const logoutFn = async () => {
      this.props.closeDrawer();
      await AsyncStorage.multiRemove(['token', 'refreshToken']);
      await this.props.client.resetStore();
      this.props.navigate('login');
    };
    return (
      <MenuItem
        key={'logout'}
        name={'Logout'}
        icon={{ name: 'logout-variant', type: 'material-community' }}
        onPress={logoutFn}
      />
    );
  }

  render() {
    const { data } = this.props;
    let me = DEFAULT_USER;
    if (!data.error && data.me) {
      me = data.me;
    }
    const { firstname, lastname, email } = me;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={Images.materialBackground}
            style={[styles.headerBackground]}
          >
            <View style={styles.statusBar} />
            {this._renderHeaderImage(me)}
            <View style={styles.headerInfo}>
              <View style={styles.line}>
                <Text bold style={[styles.text]}>
                  {firstname} {lastname}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={[styles.text]}>{email}</Text>
              </View>
            </View>
          </Image>
          {this._renderDropdownButton()}
        </View>
        <View style={styles.bodyContainer}>
          {this.state.secondaryMenu && this._renderSecondaryMenu()}
          {this.state.secondaryMenu || this._renderMenu()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  routes: state[ROUTES_KEY],
  navigation: state[NAVIGATION_KEY],
});

const mapDispatchToProps = dispatch => ({
  closeDrawer: () => dispatch(setDrawerState(false)),
  navigate: routeName => dispatch(NavigationActions.navigate({ routeName })),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(gql(query), {
    error: () => {
      console.log('error');
    },
  }),
  withApollo,
)(Menu);
