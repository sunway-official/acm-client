import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableView, FormInput } from 'Component';
import { Colors, Metrics, Fonts } from 'Theme';
import { reduxForm, Field, reset } from 'redux-form';
import { compose } from 'react-apollo';
import styles from '../styles';

const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

class HeaderSearchContent extends Component {
  static propTypes = {
    theme: PropTypes.oneOf([THEME_DARK, THEME_LIGHT]),
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    dispatch: PropTypes.func,
    onIconPress: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._renderClear = this._renderClear.bind(this);
    this._renderBack = this._renderBack.bind(this);
    this._getTheme = this._getTheme.bind(this);
    this._inputStyles = this._inputStyles.bind(this);
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

  _inputStyles() {
    const theme = this._getTheme();

    return {
      flex: 1,
      fontSize: Fonts.size.regular,
      color: theme === THEME_DARK ? Colors.secondary : Colors.darkGrey,
    };
  }

  _inputProps() {
    const theme = this._getTheme();
    const { placeholder, defaultValue } = this.props;
    return {
      placeholder: placeholder,
      returnKeyType: 'search',
      underlineColorAndroid: Colors.transparent,
      selectionColor: theme === THEME_DARK ? Colors.white : Colors.darkGrey,
      placeholderTextColor:
        theme === THEME_DARK ? Colors.secondary : Colors.grey,
      autoFocus: true,
      value: defaultValue,
    };
  }

  _renderClear({ icon }) {
    const { dispatch } = this.props;
    return (
      <TouchableView
        {...this._touchableViewStyles()}
        style={[styles.rightIconWrapper, styles.firstRightIcon]}
        onPress={() => dispatch(reset('search'))}
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
    const { dispatch, onIconPress = () => {} } = this.props;
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
        <View style={styles.leftWrapper}>{this._renderBack()}</View>
        <Field
          name="value"
          type="text"
          component={FormInput}
          containerStyle={styles.container}
          style={this._inputStyles()}
          {...this._inputProps()}
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

export default compose(
  reduxForm({
    form: 'search',
  }),
)(HeaderSearchContent);
