import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import TouchableView from '../../../Component/TouchableView';
import styles from './styles';
import { Images, Metrics } from '../../../Theme';

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
          <MaterialIcons
            style={styles.dropdownButton}
            size={Metrics.icons.small}
            name="arrow-drop-down"
          />
        </TouchableView>
      </View>
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
      </View>
    );
  }
}

export default Menu;
