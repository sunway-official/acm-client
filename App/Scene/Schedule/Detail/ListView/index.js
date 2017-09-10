import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from '~/Theme';
import { TouchableView, Text } from '~/Component';
import styles from './styles';

class ListView extends PureComponent {
  static propTypes = {
    detail: PropTypes.array,
    calendarIcon: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({ item }) {
    const { calendarIcon } = this.props;
    return (
      <TouchableView rippleColor={Colors.grey} style={styles.item}>
        <View>
          <Text style={styles.title}>
            {item.title}
          </Text>
          <Text>
            {item.time}
          </Text>
          <Text>
            {item.shortDescription}
          </Text>
        </View>
        <TouchableOpacity style={[styles.icon]}>
          <Icon
            name={calendarIcon.name}
            type={calendarIcon.type}
            color={calendarIcon.color}
            size={calendarIcon.size}
          />
        </TouchableOpacity>
      </TouchableView>
    );
  }
  render() {
    const { detail } = this.props;
    return (
      <View style={styles.container}>
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
