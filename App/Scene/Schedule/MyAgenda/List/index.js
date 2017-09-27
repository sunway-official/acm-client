import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Colors } from '~/Theme';
import PropTypes from 'prop-types';
import Item from '../Item';

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
class MyAgendaList extends Component {
  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({ item, index }) =>
          <Item {...item} contentBackgroundColor={getItemColor(index)} />}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

MyAgendaList.propTypes = {
  data: PropTypes.array,
};

export default MyAgendaList;
