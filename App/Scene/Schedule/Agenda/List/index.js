import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import styles from './styles';
import Item from '../Item';

/* eslint-disable react/prop-types */
const _renderItem = ({ item }) => {
  return <Item item={item} />;
};
/* eslint-enable react/prop-types */

const ListView = ({ detail }) => {
  console.log('detail: ', detail);
  return (
    <View style={styles.container}>
      <View style={styles.verticalLine} />
      <FlatList
        data={detail}
        keyExtractor={(item, index) => index}
        renderItem={_renderItem}
      />
    </View>
  );
};

ListView.propTypes = {
  detail: PropTypes.array,
  item: PropTypes.object,
};

export default ListView;
