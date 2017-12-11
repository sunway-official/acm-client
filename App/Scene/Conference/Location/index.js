import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { MapView } from 'expo';
import { graphql, gql } from 'react-apollo';
import { LoadingIndicator } from '~/Component';
import { Colors } from '~/Theme';
import getCurrentConferenceQuery from '~/Graphql/query/getCurrentConference.graphql';
import styles from './styles';

class ConferenceLocation extends PureComponent {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any),
  };
  render() {
    const { getCurrentConference, loading } = this.props.data;
    console.log(getCurrentConference);
    return (
      <View style={styles.container}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <MapView
            style={styles.map}
            loadingEnabled
            scrollEnabled
            zoomEnabled
            pitchEnabled
            rotateEnabled
            initialRegion={{
              latitude: Number.parseFloat(getCurrentConference.address.lat),
              longitude: Number.parseFloat(getCurrentConference.address.long),
              latitudeDelta: 0.008,
              longitudeDelta: 0.007,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: Number.parseFloat(getCurrentConference.address.lat),
                longitude: Number.parseFloat(getCurrentConference.address.long),
              }}
              draggable={false}
              description={getCurrentConference.description}
              title={getCurrentConference.title}
            />
          </MapView>
        )}
      </View>
    );
  }
}

const ConferenceLocationWrapper = graphql(gql(getCurrentConferenceQuery))(
  ConferenceLocation,
);

ConferenceLocationWrapper.drawer = {
  primary: true,
};

ConferenceLocationWrapper.header = {
  theme: 'dark',
  leftIcon: 'back',
  statusBarBackgroundColor: Colors.primary,
};

ConferenceLocationWrapper.footer = {
  disable: true,
};

export default ConferenceLocationWrapper;
