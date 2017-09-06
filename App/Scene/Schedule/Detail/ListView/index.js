import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

class ListView extends Component {
  constructor(props, context) {
    super(props, context);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({ item }) {
    const { calendarIcon } = this.props;
    return (
      <View style={styles.item}>
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
        <View style={styles.icon}>
          <Icon
            name={calendarIcon.name}
            type={calendarIcon.type}
            color={calendarIcon.color}
            size={calendarIcon.size}
          />
        </View>
      </View>
    );
  }
  render() {
    const { listAnimation, detail } = this.props;
    return (
      <View style={styles.container}>
        <Animatable.View animation={listAnimation}>
          <FlatList
            data={detail}
            keyExtractor={(item, index) => index}
            renderItem={this._renderItem}
          />
        </Animatable.View>
      </View>
    );
  }
}

ListView.propTypes = {
  listAnimation: PropTypes.string,
  detail: PropTypes.array,
  calendarIcon: PropTypes.object,
};

export default ListView;
