import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { PieChart, BarChart } from 'Component';
import { Colors } from 'Theme';
import { transformText } from 'Transformer';

const TYPES = {
  BAR: 'bar',
  PIE: 'pie',
};

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
        {this.props.pie ? (
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
  bar: PropTypes.bool,
  pie: PropTypes.bool,
};

// Loop through TYPES to define its propTypes
Object.keys(TYPES).map(key => {
  ChartComponent.propTypes[TYPES[key]] = PropTypes.bool;
});

ChartComponent.defaultProps = {
  bar: false,
  pie: false,
};
