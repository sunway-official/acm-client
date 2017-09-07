import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';
import TouchableView from '~/Component/TouchableView';
import { NavigationActions } from 'react-navigation';
import { KEY as ROUTES_KEY } from '~/Redux/Routes';
import { KEY as NAVIGATION_KEY } from '~/Redux/Navigation';
import { setDrawerState } from '~/Redux/Drawer';
import { Images, Metrics, Colors } from '~/Theme';
import styles from './styles';
import MenuItem from './Item';

const USER_NAME = 'John Cena';
const USER_EMAIL = 'unknow@gmail.com';
const MENU_ITEMS_ANIMATION = 'fadeInUp';
const DROPDOWN_ICON_ANIMATION = 'rotate';
const ANIMATION_DELAY = 300;

class Menu extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func,
    navigate: PropTypes.func,
    routes: PropTypes.object,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this._renderMenu = this._renderMenu.bind(this);
    this._renderSecondaryMenu = this._renderSecondaryMenu.bind(this);
    this._renderDropdownButton = this._renderDropdownButton.bind(this);
    this._onMenuItemPress = this._onMenuItemPress.bind(this);

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

  _renderHeaderImage() {
    return (
      <View style={styles.headerImage}>
        <Image source={Images.imgDefault100} style={styles.profileImage} />
        <Image source={Images.imgDefault50} style={styles.conferenceImage} />
      </View>
    );
  }

  _renderDropdownButton() {
    let icon = null; // AnimatableView ref
    const onPress = () => {
      icon[DROPDOWN_ICON_ANIMATION](ANIMATION_DELAY * 2);
      this.setState({
        secondaryMenu: !this.state.secondaryMenu,
      });
    };
    return (
      <View style={styles.dropdownButtonWrapper}>
        <TouchableView
          style={styles.dropdownButtonTouchableView}
          borderless={true}
          onPress={onPress}
        >
          <AnimatableView ref={ref => (icon = ref)}>
            <Icon
              color={Colors.white}
              size={Metrics.icons.small}
              name="arrow-drop-down"
              type="material-icons"
            />
          </AnimatableView>
        </TouchableView>
      </View>
    );
  }

  _renderMenu() {
    const routes = this.props.routes;

    let items = [];
    Object.keys(routes).map(key => {
      const { name, icon, drawer } = routes[key];
      if (drawer) {
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
    return this._renderMenuWrapper(items);
  }

  _renderSecondaryMenu() {
    const routes = this.props.routes;

    let items = [];
    Object.keys(routes).map(key => {
      const { name, icon, secondaryDrawer } = routes[key];
      if (secondaryDrawer) {
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
    return this._renderMenuWrapper(items);
  }

  _renderMenuWrapper(element) {
    return (
      <AnimatableView
        animation={MENU_ITEMS_ANIMATION}
        duration={ANIMATION_DELAY}
      >
        {element}
      </AnimatableView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={Images.materialBackground}
            style={[styles.headerBackground]}
          >
            <View style={styles.statusBar} />
            {this._renderHeaderImage()}
            <View style={styles.headerInfo}>
              <View style={styles.line}>
                <Text style={[styles.text, styles.name]}>
                  {USER_NAME}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={[styles.text, styles.email]}>
                  {USER_EMAIL}
                </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
