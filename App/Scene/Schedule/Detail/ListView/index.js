import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../../../Theme';
import styles from './styles';

class ListView extends Component {
  _renderItem({ item }) {
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
        <View>
          <Icon name="calendar" type="entypo" color={Colors.black} size={30} />
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
};

export default ListView;
