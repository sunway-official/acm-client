import React from 'react';
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { News } from '~/Component';
import { NEWS } from '~/Scene/Profile/fixture';

const Activities = () => {
  return (
    <View>
      <Text>This component is under contructor</Text>
    </View>

    // <View>{NEWS.map((item, index) => <News item={item} key={index} />)}</View>
  );
};

Activities.propTypes = {};

export default Activities;
