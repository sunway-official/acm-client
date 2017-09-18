import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Platform } from 'react-native';
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

class DefaultHeaderContent extends Component {
  static propTypes = {
    title: PropTypes.string,
    hideTitle: PropTypes.bool,
    theme: PropTypes.oneOf([THEME_DARK, THEME_LIGHT]),
    icon: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.oneOf(Icons.ICON_TYPE),
    }),
    onIconPress: PropTypes.func,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.PropTypes.shape({
          name: PropTypes.string,
          type: PropTypes.oneOf(Icons.ICON_TYPE),
        }).isRequired,
        onPress: PropTypes.func.isRequired,
        // counter: PropTypes.shape(),
      }),
    ),
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._getTheme = this._getTheme.bind(this);
    this._textStyles = this._textStyles.bind(this);
    this._iconStyles = this._iconStyles.bind(this);
    this._touchableViewStyles = this._touchableViewStyles.bind(this);
    this._renderAction = this._renderAction.bind(this);
  }

  _getTheme = () => this.props.theme || THEME_LIGHT;

  _textStyles = () => {
    const theme = this._getTheme();
    return {
      color: theme === THEME_DARK ? Colors.white : Colors.darkGrey,
    };
  };

  _iconStyles = () => {
    const theme = this._getTheme();
    return {
      color: theme === THEME_DARK ? Colors.white : Colors.darkGrey,
      size: Metrics.icons.small,
    };
  };

  _touchableViewStyles = () => {
    const theme = this._getTheme();
    return {
      rippleColor: theme === THEME_DARK ? Colors.white : Colors.darkGrey,
      borderless: true,
    };
  };

  _renderAction({ icon, onPress = () => {} }, index) {
    let actionWrapperStyles = [styles.rightIconWrapper];

    const { dispatch } = this.props;
    if (index === 0) {
      actionWrapperStyles = [...actionWrapperStyles, styles.firstRightIcon];
    }
    return (
      <TouchableView
        key={index}
        {...this._touchableViewStyles()}
        style={[actionWrapperStyles]}
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

  render() {
    const { title, hideTitle, icon, onIconPress, actions = [] } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.leftWrapper}>
          <TouchableView
            style={styles.iconWrapper}
            {...this._touchableViewStyles()}
            onPress={onIconPress}
          >
            <Icon
              name="menu"
              {...icon}
              onPress={undefined}
              {...this._iconStyles()}
            />
          </TouchableView>
        </View>
        {hideTitle ||
          <View style={styles.centerWrapper}>
            <View style={styles.titleWrapper}>
              <Text bold style={[styles.title, this._textStyles()]}>
                {title}
              </Text>
            </View>
          </View>}
        <View style={styles.rightWrapper}>
          {actions.map(this._renderAction)}
        </View>
      </View>
    );
  }
}

export default connect()(DefaultHeaderContent);
