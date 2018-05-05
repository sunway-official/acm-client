import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { PieChart, BarChart } from 'Component';
import { Colors } from 'Theme';

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

export class ChartComponent extends Component {
  filteredListToPieChart = data => {
    return data.map(item => {
      return {
        x: item.key,
        y: item.percentage,
        label: `${item.label}\n(${item.value} ${this.props.unitLabel || null})`,
      };
    });
  };

  filteredListToBarChart = data => {
    return data.map(item => {
      return {
        x: item.label,
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
            description={this.props.description}
            colorScale={color}
            labelRadius={72}
          />
        ) : (
          <BarChart
            data={this.filteredListToBarChart(this.props.data)}
            description={this.props.description}
          />
        )}
      </View>
    );
  }
}

ChartComponent.propTypes = {
  data: PropTypes.array,
  description: PropTypes.string,
  unitLabel: PropTypes.string,
};
