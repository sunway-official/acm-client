import React from 'react';
import { FlatList, View } from 'react-native';
import { Colors } from '~/Theme';
import PropTypes from 'prop-types';
import Item from '../Item';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import { connect } from 'react-redux';
import moment from 'moment';
import { DATE_FORMAT } from '~/env';

import styles from './styles';

// const HEADER_TITLE_DATE_FORMAT = 'MMMM';

const getItemColor = index => {
  let color = Colors.primary;
  const indexValue = index % 3;
  switch (indexValue) {
    case 0:
      color = {
        background: Colors.grey,
      };
      break;
    case 1:
      color = {
        background: Colors.lightBlue,
      };
      break;
    case 2:
      color = {
        background: Colors.lightIndigo,
      };
      break;
    // case 3:
    //   color = {
    //     primary: Colors.red,
    //     background: Colors.lightRed,
    //   };
    //   break;
    // case 4:
    //   color = {
    //     primary: Colors.green,
    //     background: Colors.lightGreen,
    //   };
    //   break;
    default:
      break;
  }
  return color;
};

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
    title: moment(date, DATE_FORMAT).format(),
  });
};

const MyAgendaList = ({ data, setHeader }) => {
  return (
    <View style={styles.container}>
      <View style={styles.verticalLine} />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Item {...item} color={getItemColor(index)} />
        )}
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
