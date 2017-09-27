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
  let backgroundColor = Colors.primary;
  const indexValue = index % 4;
  switch (indexValue) {
    case 0:
      backgroundColor = Colors.purple;
      break;
    case 1:
      backgroundColor = Colors.green;
      break;
    case 2:
      backgroundColor = Colors.red;
      break;
    case 3:
      backgroundColor = Colors.blue;
      break;
    default:
      break;
  }
  return backgroundColor;
};

const onViewableItemsChangedHandler = ({ viewableItems, data, setHeader }) => {
  const { index } = viewableItems[0];
  const { date } = data[index];
  setHeader({
    title: moment(date, DATE_FORMAT).format(HEADER_TITLE_DATE_FORMAT),
    theme: 'dark',
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
