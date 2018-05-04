import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator, PieChart, BarChart } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from '../styles';
import GET_ATTENDEES_STATISTIC_BY_LANGUAGE from 'Graphql/query/getAttendeesStatisticByLanguage.graphql';

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

class AttendeesStatisticByInteresting extends Component {
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
      return AttendeesStatisticByInteresting._renderLoading();
    }

    return (
      <View>
        {this.props.data.getAttendeesStatisticByLanguage.length < 6 ? (
          <PieChart
            data={this.filteredListToPieChart(
              this.props.data.getAttendeesStatisticByLanguage,
            )}
            description={'The number of attendees based on language'}
            colorScale={color}
            labelRadius={72}
          />
        ) : (
          <BarChart
            data={this.filteredListToBarChart(
              this.props.data.getAttendeesStatisticByLanguage,
            )}
            description={'The number of attendees based on language'}
          />
        )}
      </View>
    );
  }
}

AttendeesStatisticByInteresting.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_LANGUAGE)))(
  AttendeesStatisticByInteresting,
);
