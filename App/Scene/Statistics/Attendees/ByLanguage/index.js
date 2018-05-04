import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from '../styles';
import GET_ATTENDEES_STATISTIC_BY_LANGUAGE from 'Graphql/query/getAttendeesStatisticByLanguage.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class AttendeesStatisticByInteresting extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return AttendeesStatisticByInteresting._renderLoading();
    }

    return (
      <ChartComponent
        data={this.props.data.getAttendeesStatisticByLanguage}
        description={'getAttendeesStatisticByLanguage'}
        unitLabel={'people'}
      />
    );
  }
}

AttendeesStatisticByInteresting.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_LANGUAGE)))(
  AttendeesStatisticByInteresting,
);
