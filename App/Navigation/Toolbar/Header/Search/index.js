import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';
import { Text, TouchableView } from '~/Component';
import { Colors, Metrics, Icons } from '~/Theme';
import styles from '../styles';

const IS_ANDROID = Platform.OS === 'android';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const HIDDING_DELAY = 150;

class HeaderSearchContent extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._renderClear = this._renderClear.bind(this);
    this._renderBack = this._renderBack.bind(this);
  }

  _touchableViewStyles() {
    return {
      rippleColor: Colors.secondaryDark,
      borderless: true,
    };
  }

  _iconStyles() {
    return {
      color: Colors.grey,
    };
  }

  _renderClear({ icon, onPress = () => {} }) {
    const { dispatch } = this.props;
    return (
      <TouchableView
        {...this._touchableViewStyles()}
        style={[styles.rightIconWrapper, styles.firstRightIcon]}
        onPress={() => onPress(dispatch)}
      >
        <Icon
          name="more-vert"
          {...icon}
          onPress={undefined}
          {...this._iconStyles()}
        />
      </TouchableView>
    );
  }

  _renderBack() {
    return (
      <TouchableView
        style={styles.iconWrapper}
        {...this._touchableViewStyles()}
        // onPress={onIconPress}
      >
        <Icon name="arrow-back" onPress={undefined} {...this._iconStyles()} />
      </TouchableView>
    );
  }

  render() {
    const { placeholder, value } = this.props;
    return (
      <View style={[styles.container, styles.searchWrapper]}>
        <View style={styles.leftWrapper}>
          {this._renderBack()}
        </View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          returnKeyType="search"
          underlineColorAndroid={Colors.transparent}
          selectionColor={Colors.darkGrey}
        />
        <View style={styles.rightWrapper}>
          {this._renderClear({
            icon: { name: 'clear' },
          })}
        </View>
      </View>
    );
  }
}

export default connect()(HeaderSearchContent);
