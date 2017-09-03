import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const TabIcon = props => {
  return (
    <Text style={{ color: props.selected ? 'red' : 'black' }}>
      {props.title}
    </Text>
  );
};

TabIcon.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

export default TabIcon;
