import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from './styles';
import { Colors } from 'Theme';
import GET_ATTENDEES_STATISTIC_BY_TOTAL_PHOTOS from 'Graphql/query/getAttendeesStatisticByTotalPhotos.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class TopUploadedPhotosUsers extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return TopUploadedPhotosUsers._renderLoading();
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <ChartComponent
            data={this.props.data.getAttendeesStatisticByTotalPhotos}
            pieChartDescription={
              'The percentage of attendees based on uploaded photos'
            }
            barChartDescription={
              'The top of attendees based on uploaded photos'
            }
            bar
          />
        </ScrollView>
      </View>
    );
  }
}

TopUploadedPhotosUsers.header = {
  leftIcon: 'back',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

TopUploadedPhotosUsers.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_TOTAL_PHOTOS)))(
  TopUploadedPhotosUsers,
);
