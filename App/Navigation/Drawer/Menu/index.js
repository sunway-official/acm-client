import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import TouchableView from '../../../Component/TouchableView';
import styles from './styles';
// import routes from '../../routes';
import { setDrawerState } from '../../../Redux/Drawer';
import { Images, Metrics, Colors } from '../../../Theme';
import MenuItem from './Item';

const USER_NAME = 'John Cena';
const USER_EMAIL = 'unknow@gmail.com';

class Menu extends PureComponent {
  static propTypes = {
    closeDrawer: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._renderMenu = this._renderMenu.bind(this);
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
    const onPress = () => {};
    return (
      <View style={styles.dropdownButtonWrapper}>
        <TouchableView
          style={styles.dropdownButtonTouchableView}
          borderless={true}
          onPress={onPress}
        >
          <Icon
            color={Colors.white}
            size={Metrics.icons.small}
            name="arrow-drop-down"
            type="material-icons"
          />
        </TouchableView>
      </View>
    );
  }

  _renderMenu() {
    // let routes = [];
    // Object.keys(AppRoutes).map(key => {
    //   const { name, icon, drawer } = AppRoutes[key];
    //   if (drawer) {
    //     const component = props => {
    //       return (
    //         <MenuItem
    //           name={name}
    //           icon={icon}
    //           onPress={() => {
    //             // Actions.jump(key);
    //             // console.log(key);
    //             this.props.closeDrawer();
    //           }}
    //         />
    //       );
    //     };
    //     routes.push(<Scene hideNavBar key={key} component={component} />);
    //   }
    // });
    // return (
    //   <Router>
    //     <Overlay>
    //       {routes}
    //     </Overlay>
    //   </Router>
    // );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={Images.materialBackground}
            style={[styles.headerBackground, styles.statusBar]}
          >
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
          {/*this._renderMenu()*/}
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeDrawer: () => dispatch(setDrawerState(false)),
});

export default connect(undefined, mapDispatchToProps)(Menu);
