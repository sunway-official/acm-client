import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'Component';
import styles from './styles';
import { Colors, Metrics } from 'Theme';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';

const BarChart = ({ data, description = null }) => [
  <Text key={1} style={styles.text}>
    {description}
  </Text>,
  <VictoryChart
    key={2}
    domainPadding={{ y: 20 }}
    height={data.length * 70}
    width={Metrics.screenWidth / 1.1}
  >
    <VictoryAxis
      style={{
        axis: { stroke: Colors.primary },
        axisLabel: { fontSize: 16, fill: Colors.gray },
        ticks: { stroke: Colors.gray },
        // hidden tick labels
        tickLabels: {
          fontSize: 1,
          fill: Colors.white,
        },
        grid: { stroke: Colors.lightCyan, strokeWidth: 0.25 },
      }}
      dependentAxis
    />
    <VictoryAxis
      style={{
        axis: { stroke: Colors.secondary },
        axisLabel: { fontSize: 16 },
        ticks: { stroke: Colors.gray },
        tickLabels: {
          fontSize: 10,
          fill: Colors.black,
          fontWeight: 'bold',
        },
      }}
    />
    <VictoryBar
      horizontal
      style={{
        data: {
          fill: Colors.primary,
          fillOpacity: 0.7,
          strokeWidth: 1,
        },
      }}
      data={data}
      labels={d => `${d.x}`}
    />
  </VictoryChart>,
];

BarChart.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

BarChart.footer = {
  activeColor: Colors.primary,
  show: true,
};

BarChart.propTypes = {
  data: PropTypes.array,
};

export default BarChart;
