import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { TouchableView } from '~/Component';
import { Colors, Metrics } from '~/Theme';
import styles from '../styles';

const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

class HeaderSearchContent extends Component {
  static propTypes = {
    theme: PropTypes.oneOf([THEME_DARK, THEME_LIGHT]),
    value: PropTypes.string,
    placeholder: PropTypes.string,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._renderClear = this._renderClear.bind(this);
    this._renderBack = this._renderBack.bind(this);
    this._getTheme = this._getTheme.bind(this);
    this._inputProps = this._inputProps.bind(this);
  }

  _getTheme = () => this.props.theme || THEME_LIGHT;

  _touchableViewStyles() {
    const theme = this._getTheme();
    return {
      rippleColor: theme === THEME_DARK ? Colors.white : Colors.darkGrey,
      borderless: true,
    };
  }

  _wrapperStylets() {
    const theme = this._getTheme();

    return {
      backgroundColor: theme === THEME_DARK ? Colors.transparent : Colors.white,
    };
  }

  _iconStyles() {
    const theme = this._getTheme();
    return {
      color: theme === THEME_DARK ? Colors.white : Colors.darkGrey,
      size: Metrics.icons.small,
    };
  }

  _inputProps() {
    const theme = this._getTheme();
    const { placeholder, value } = this.props;
    return {
      placeholder: placeholder,
      returnKeyType: 'search',
      underlineColorAndroid: Colors.transparent,
      selectionColor: theme === THEME_DARK ? Colors.white : Colors.darkGrey,
      autoFocus: true,
      defaultValue: value,
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
    const { dispatch } = this.props;
    return (
      <TouchableView
        style={styles.iconWrapper}
        {...this._touchableViewStyles()}
        onPress={() => onIconPress(dispatch)}
      >
        <Icon name="arrow-back" onPress={undefined} {...this._iconStyles()} />
      </TouchableView>
    );
  }

  render() {
    return (
      <View style={[styles.container, styles.searchWrapper]}>
        <View style={styles.leftWrapper}>
          {this._renderBack()}
        </View>
        <TextInput style={styles.input} {...this._inputProps()} />
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
