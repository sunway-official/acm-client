import React from 'react';
import { FlatList } from 'react-native';
import { Colors } from '~/Theme';
import PropTypes from 'prop-types';
import Item from '../Item';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import { connect } from 'react-redux';
import moment from 'moment';
import { DATE_FORMAT } from 'react-native-dotenv';

const HEADER_TITLE_DATE_FORMAT = 'dddd, MMM Do';

const getItemColor = index => {
  let color = Colors.primary;
  const indexValue = index % 5;
  switch (indexValue) {
    case 0:
      color = Colors.primary;
      break;
    case 1:
      color = Colors.green;
      break;
    case 2:
      color = Colors.red;
      break;
    case 3:
      color = Colors.blue;
      break;
    case 4:
      color = Colors.purple;
      break;
    default:
      break;
  }
  return color;
};

const onViewableItemsChangedHandler = ({ viewableItems, data, setHeader }) => {
  if (viewableItems.length === 0) return;
  const { index } = viewableItems[0];
  const { date } = data[index];
  setHeader({
    title: moment(date, DATE_FORMAT).format(HEADER_TITLE_DATE_FORMAT),
    backgroundColor: getItemColor(index),
    statusBarBackgroundColor: getItemColor(index),
  });
};

const MyAgendaList = ({ data, setHeader }) =>
  <FlatList
    data={data}
    renderItem={({ item, index }) =>
      <Item {...item} contentBackgroundColor={getItemColor(index)} />}
    keyExtractor={(item, index) => index}
    onViewableItemsChanged={({ viewableItems }) =>
      onViewableItemsChangedHandler({ viewableItems, data, setHeader })}
  />;

MyAgendaList.propTypes = {
  data: PropTypes.array,
  setHeader: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  setHeader: options => dispatch(addHeaderOptions(options)),
});
export default connect(undefined, mapDispatchToProps)(MyAgendaList);
