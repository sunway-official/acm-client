import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { PieChart, BarChart } from 'Component';
import { Colors } from 'Theme';
import { transformText } from 'Transformer';

const color = [
  Colors.green,
  Colors.blue,
  Colors.indigo,
  Colors.navy,
  Colors.amber,
  Colors.orange,
  Colors.red,
  Colors.teal,
  Colors.brown,
  Colors.pink,
];

const CHAR_LENGTH = 20;

export class ChartComponent extends Component {
  filteredListToPieChart = data => {
    return data.map(item => {
      return {
        x: item.key,
        y: item.percentage,
        label: `${item.label}\n(${item.percentage}%)`,
      };
    });
  };

  filteredListToBarChart = data => {
    return data.map(item => {
      return {
        x: transformText.reduceByCharacters(item.label, CHAR_LENGTH),
        y: item.value,
      };
    });
  };

  render() {
    return (
      <View>
        {this.props.data.length < 6 ? (
          <PieChart
            data={this.filteredListToPieChart(this.props.data)}
            description={this.props.pieChartDescription}
            colorScale={color}
            labelRadius={72}
          />
        ) : (
          <BarChart
            data={this.filteredListToBarChart(this.props.data)}
            description={this.props.barChartDescription}
          />
        )}
      </View>
    );
  }
}

ChartComponent.propTypes = {
  data: PropTypes.array,
  pieChartDescription: PropTypes.string,
  barChartDescription: PropTypes.string,
  unitLabel: PropTypes.string,
};
