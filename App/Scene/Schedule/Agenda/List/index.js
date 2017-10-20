import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import styles from './styles';
import Item from '../Item';

class ListView extends Component {
  static propTypes = {
    detail: PropTypes.array,
    calendarIcon: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  _renderItem({ item }) {
    return <Item item={item} />;
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
