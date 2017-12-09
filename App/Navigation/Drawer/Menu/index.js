import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { compose, graphql, gql, withApollo } from 'react-apollo';
import { AnimatableView, Text, UserAvatar } from '~/Component';
import { connect } from 'react-redux';
import { KEY as ROUTES_KEY } from '~/Redux/Routes';
import { KEY as NAVIGATION_KEY, NavigationActions } from '~/Redux/Navigation';
import { setDrawerState } from '~/Redux/Drawer';
import { Images, Metrics, Colors } from '~/Theme';
import { IS_DEBUGGING } from '~/env';
import MenuItem from './Item';
import QUERY_ME from '~/Graphql/query/me.graphql';
import styles from './styles';

const USER_FIRSTNAME = 'Sunway';
const USER_LASTNAME = 'Team';
const USER_EMAIL = 'sunway.offical@gmail.com';
const MENU_ITEMS_ANIMATION = 'fadeInUp';
const DROPDOWN_ICON_ANIMATION = 'rotate';
const ANIMATION_DELAY = 300;
const ACTIVE_TOUCHABLE_OPACITY = 0.4;

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
    reset: PropTypes.func,
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
      this.props.reset(key);
    }
    this.props.closeDrawer();
  }

  _renderHeaderImage(user) {
    let { avatar, gender } = user;
    return (
      <View style={styles.headerImage}>
        <UserAvatar
          large
          avatar={avatar}
          gender={gender}
          avatarStyle={styles.avatarImage}
        />
        <TouchableOpacity
          style={styles.conferenceImageWrapper}
          onPress={() => this._onMenuItemPress('conferenceList')}
        >
          <Image source={Images.logo.white} style={styles.conferenceImage} />
        </TouchableOpacity>
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
      this.props.reset('login');
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
    const { firstname, lastname, position, organization } = me;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ImageBackground
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
                <Text style={[styles.text]}>
                  {position} at {organization}
                </Text>
              </View>
            </View>
          </ImageBackground>
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
  reset: routeName => dispatch(NavigationActions.reset({ routeName })),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(gql(QUERY_ME)),
  withApollo,
)(Menu);
