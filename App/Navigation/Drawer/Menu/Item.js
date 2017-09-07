import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import TouchableView from '../../../Component/TouchableView';
import { Metrics, Colors, Icons } from '../../../Theme';
import styles from './styles';

class Item extends Component {
  static propTypes = {
    name: PropTypes.string,
    icon: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Icons.ICON_TYPE),
    }),
    onPress: PropTypes.func,
  };

  render() {
    const { name, icon, onPress } = this.props;
    return (
      <TouchableView
        style={styles.menuItem}
        rippleColor={Colors.primary}
        onPress={onPress}
      >
        <View style={styles.menuItemIconWrapper}>
          <Icon
            color={Colors.grey}
            size={Metrics.icons.medium}
            type={icon.type}
            name={icon.name}
          />
        </View>
        <View style={styles.menuItemNameWrapper}>
          <Text style={styles.menuItemNameText}>{name}</Text>
        </View>
      </TouchableView>
    );
  }
}

export default Item;
