import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'Component';
import { VictoryPie } from 'victory-native';
import styles from './styles';

const PieChart = ({ data, description, colorScale, labelRadius }) => [
  <Text key={1} style={styles.text}>
    {description}
  </Text>,
  <VictoryPie
    key={2}
    data={data}
    colorScale={colorScale}
    labelRadius={labelRadius}
    style={{
      labels: {
        fill: 'white',
        fontSize: 12,
        fontWeight: 'bold',
      },
    }}
  />,
];

PieChart.propTypes = {
  data: PropTypes.array,
  colorScale: PropTypes.array,
};

export default PieChart;
