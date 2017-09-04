import React, { PureComponent } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import TouchableView from '../../../Component/TouchableView';
import styles from './styles';
import { Images, Metrics, Colors } from '../../../Theme';

const USER_NAME = 'John Cena';
const USER_EMAIL = 'unknow@gmail.com';

class Menu extends PureComponent {
  static propTypes = {};

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

  _renderBody() {
    return (
      <TouchableView style={styles.menuItem} rippleColor={Colors.primary}>
        <View style={styles.menuItemIconWrapper}>
          <Icon
            color={Colors.grey}
            size={Metrics.icons.medium}
            type="material-community"
            name="calendar"
          />
        </View>
        <View style={styles.menuItemNameWrapper}>
          <Text style={styles.menuItemNameText}>Schedules</Text>
        </View>
      </TouchableView>
    );
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
        <ScrollView style={styles.bodyContainer}>
          {this._renderBody()}
        </ScrollView>
      </View>
    );
  }
}

export default Menu;
