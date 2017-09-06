import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../../../Theme';
import styles from './styles';

const data = [1, 2, 3, 4, 5];

class ListView extends Component {
  _renderItem({ item, index }) {
    const marginBottom = index === data.length - 1 ? 0 : 1;
    return (
      <View
        style={[
          styles.item,
          {
            marginBottom: marginBottom,
          },
        ]}
      >
        <Text>
          {item}
        </Text>
        <View>
          <Icon name="calendar" type="entypo" color={Colors.black} size={30} />
        </View>
      </View>
    );
  }
  render() {
    const { listAnimation } = this.props;
    return (
      <View style={styles.container}>
        <Animatable.View animation={listAnimation}>
          <FlatList
            data={data}
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
};

export default ListView;
