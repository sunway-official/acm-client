import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'Component';
import { VictoryPie } from 'victory-native';
import { View } from 'react-native';
import styles from './styles';

const PieChartScene = ({ data, colorScale }) => (
  <View>
    <VictoryPie
      data={data}
      colorScale={colorScale}
      labelRadius={72}
      style={{
        labels: {
          fill: 'white',
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    />
    <Text style={styles.text}>The number of attendees based on categories</Text>
  </View>
);

PieChartScene.propTypes = {
  data: PropTypes.array,
  colorScale: PropTypes.array,
};

export default PieChartScene;
