import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator, PieChart, BarChart } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from '../styles';
import GET_ATTENDEES_STATISTIC_BY_ORGANIZATION from 'Graphql/query/getAttendeesStatisticByOrganization.graphql';

const color = [
  'tomato',
  'orange',
  'gold',
  'cyan',
  'navy',
  'black',
  'green',
  'red',
];

class AttendeesStatisticByOrganization extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  filteredListToPieChart = data => {
    return data.map(item => {
      return {
        x: item.key,
        y: item.percentage,
        label: `${item.label}\n(${item.value} people)`,
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
    if (this.props.data.loading) {
      return AttendeesStatisticByOrganization._renderLoading();
    }

    return (
      <View>
        {this.props.data.getAttendeesStatisticByOrganization.length < 6 ? (
          <PieChart
            data={this.filteredListToPieChart(
              this.props.data.getAttendeesStatisticByOrganization,
            )}
            description={'The number of attendees based on organizer'}
            colorScale={color}
            labelRadius={72}
          />
        ) : (
          <BarChart
            data={this.filteredListToBarChart(
              this.props.data.getAttendeesStatisticByOrganization,
            )}
            description={'The number of attendees based on organizer'}
          />
        )}
      </View>
    );
  }
}

AttendeesStatisticByOrganization.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_ORGANIZATION)))(
  AttendeesStatisticByOrganization,
);
