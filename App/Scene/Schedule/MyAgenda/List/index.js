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
  const indexValue = index % 2;
  switch (indexValue) {
    case 0:
      color = {
        primary: Colors.blue,
        background: Colors.blue,
      };
      break;
    case 1:
      color = {
        primary: Colors.green,
        background: Colors.green,
      };
      break;
    // case 2:
    //   color = {
    //     primary: Colors.blue,
    //     background: Colors.blue,
    //   };
    //   break;
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
    title: moment(date, DATE_FORMAT).format(HEADER_TITLE_DATE_FORMAT),
  });
};

const MyAgendaList = ({ data, setHeader }) =>
  <FlatList
    data={data}
    renderItem={({ item, index }) =>
      <Item {...item} color={getItemColor(index)} />}
    keyExtractor={(item, index) => index}
    onViewableItemsChanged={({ ...info }) =>
      onViewableItemsChangedHandler({ ...info, data, setHeader })}
  />;

MyAgendaList.propTypes = {
  data: PropTypes.array,
  setHeader: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  setHeader: options => dispatch(addHeaderOptions(options)),
});
export default connect(undefined, mapDispatchToProps)(MyAgendaList);
