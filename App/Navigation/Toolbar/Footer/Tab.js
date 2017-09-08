import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableView, Text } from '~/Component';
import { Icon } from 'react-native-elements';
import { Colors, Metrics, Icons, Fonts } from '~/Theme';
import styles from './styles';
const THEME_DARK = 'dark';

class FooterTab extends Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.oneOf(Icons.ICON_TYPE),
    }).isRequired,
    activeIcon: PropTypes.PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.oneOf(Icons.ICON_TYPE),
    }),
    active: PropTypes.bool,
    option: PropTypes.object,
    onPress: PropTypes.func,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this._getTheme = this._getTheme.bind(this);
    this._touchableViewStyles = this._touchableViewStyles.bind(this);
    this._textStyles = this._textStyles.bind(this);
    this._iconStyles = this._iconStyles.bind(this);
  }

  _getTheme = () => this.props.theme || THEME_DARK;

  _touchableViewStyles = color => {
    const theme = this._getTheme();
    return {
      rippleColor: color || (theme === THEME_DARK ? Colors.white : Colors.grey),
      borderless: true,
    };
  };

  _textStyles = color => {
    const theme = this._getTheme();
    return {
      color: color || (theme === THEME_DARK ? Colors.white : Colors.grey),
      textAlign: 'center',
      fontSize: Fonts.size.small,
    };
  };

  _iconStyles = color => {
    const theme = this._getTheme();
    return {
      color: color || (theme === THEME_DARK ? Colors.white : Colors.grey),
      size: Metrics.icons.small,
    };
  };

  render() {
    const { title, icon, onPress, option, active } = this.props;
    const { activeColor } = option;
    console.log(this.props.activeIcon);
    const activeIcon = this.props.activeIcon || icon;
    return (
      <TouchableView
        {...this._touchableViewStyles(activeColor)}
        style={[styles.tabWrapper]}
        onPress={onPress}
      >
        <Icon
          name="more-vert"
          {...(active ? activeIcon : icon)}
          onPress={undefined}
          {...this._iconStyles(active && activeColor)}
        />
        <Text
          style={[styles.tabLabel, this._textStyles(active && activeColor)]}
        >
          {title}
        </Text>
      </TouchableView>
    );
  }
}

export default FooterTab;
