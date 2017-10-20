import React from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import Item from '../Item';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import { connect } from 'react-redux';
import moment from 'moment';
import { DATE_FORMAT } from '~/env';

import styles from './styles';

/**
 * Handle scrolling event in FlatList
 */
const onViewableItemsChangedHandler = ({
  viewableItems,
  changed,
  data,
  setHeader,
}) => {
  if (viewableItems.length === 0) return;
  if (changed.length === 0) return;

  const { index } = viewableItems[0];
  const { date } = data[index];
  setHeader({
    title: moment(new Date(date)).format(DATE_FORMAT),
  });
};

const MyAgendaList = ({ data, setHeader }) => {
  return (
    <View style={styles.container}>
      <View style={styles.verticalLine} />
      <FlatList
        data={data}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item, index) => index}
        onViewableItemsChanged={({ ...info }) =>
          onViewableItemsChangedHandler({ ...info, data, setHeader })}
      />
    </View>
  );
};

MyAgendaList.propTypes = {
  data: PropTypes.array,
  setHeader: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  setHeader: options => dispatch(addHeaderOptions(options)),
});
export default connect(undefined, mapDispatchToProps)(MyAgendaList);
