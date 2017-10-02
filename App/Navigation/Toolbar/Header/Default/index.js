import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Text, TouchableView } from '~/Component';
import { Colors, Metrics, Icons } from '~/Theme';
import { openMenu, closeMenu, setMenuState } from '~/Redux/Toolbar/action';
import styles from '../styles';

const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

const ICON_SHAPE = PropTypes.PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.oneOf(Icons.ICON_TYPE),
}).isRequired;

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
        icon: ICON_SHAPE,
        onPress: PropTypes.func.isRequired,
        // counter: PropTypes.shape(),
      }),
    ),
    menu: PropTypes.shape({
      icon: ICON_SHAPE,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          icon: ICON_SHAPE,
          onPress: PropTypes.func.isRequired,
          // counter: PropTypes.shape(),
        }),
      ),
    }),
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    menu: {
      icon: {},
      actions: [],
    },
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

  _renderMenus() {
    const { dispatch, menu: { icon, actions } } = this.props;
    if (actions.length === 0) return null;
    return (
      <TouchableView
        {...this._touchableViewStyles()}
        style={[styles.rightIconWrapper, styles.firstRightIcon]}
        onPress={() => dispatch(openMenu())}
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

  _renderAction({ icon, onPress = () => {} }, index) {
    let actionWrapperStyles = [styles.rightIconWrapper];

    const { dispatch, menu } = this.props;
    if (index === 0 && menu.actions.length === 0) {
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
          name="home"
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
          {this._renderMenus()}
          {actions.map(this._renderAction)}
        </View>
      </View>
    );
  }
}

export default connect()(DefaultHeaderContent);
