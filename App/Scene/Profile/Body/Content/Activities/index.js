import React from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { News } from '~/Component';
import { news } from '~/Scene/Profile/fixture';

const Activities = () => {
  return (
    <View>{news.map((item, index) => <News item={item} key={index} />)}</View>
  );
};

Activities.propTypes = {};

export default Activities;
