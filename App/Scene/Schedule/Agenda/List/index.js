import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from '~/Theme';
import { TouchableView, Text } from '~/Component';
import styles from './styles';
import moment from 'moment';

const DEFAULT_ITEM_ICON = {
  type: 'material-community',
  name: 'checkbox-blank-circle-outline',
  color: Colors.primary,
  size: 26,
};

const ACTIVE_ITEM_ICON = {
  type: 'material-community',
  name: 'checkbox-marked-circle',
  color: Colors.primary,
  size: 26,
};

class ListView extends Component {
  static propTypes = {
    detail: PropTypes.array,
    calendarIcon: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({ item }) {
    // console.log('item: ', item);
    return (
      <View style={styles.item}>
        <TouchableView
          style={styles.iconWrapper}
          rippleColor={Colors.primary}
          borderless
        >
          <View style={styles.icon}>
            {item.activity.status ? (
              <Icon {...ACTIVE_ITEM_ICON} />
            ) : (
              <Icon {...DEFAULT_ITEM_ICON} />
            )}
          </View>
        </TouchableView>
        <View style={styles.timeWrapper}>
          <Text bold>
            {moment(item.start)
              .local()
              .format('LT')}
          </Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.primaryText}>{item.activity.title}</Text>
          <Text style={styles.secondaryText}>{item.room.name}</Text>
        </View>
        <View style={styles.timeWrapper} />
      </View>
    );
  }
  render() {
    const { detail } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.verticalLine} />
        <FlatList
          data={detail}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default ListView;
