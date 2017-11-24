import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { MapView } from 'expo';
import { graphql, gql } from 'react-apollo';
import { LoadingIndicator } from '~/Component';
import { Colors } from '~/Theme';
import getConferenceByIDQuery from '~/Graphql/query/getConferenceById.graphql';
import styles from './styles';

class ConferenceLocation extends PureComponent {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any),
  };
  render() {
    const { getConferenceByID, loading } = this.props.data;
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
              latitude: Number.parseFloat(getConferenceByID.address.lat),
              longitude: Number.parseFloat(getConferenceByID.address.long),
              latitudeDelta: 0.008,
              longitudeDelta: 0.007,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: Number.parseFloat(getConferenceByID.address.lat),
                longitude: Number.parseFloat(getConferenceByID.address.long),
              }}
              draggable={false}
              description={getConferenceByID.description}
              title={getConferenceByID.title}
            />
          </MapView>
        )}
      </View>
    );
  }
}

const ConferenceLocationWrapper = graphql(gql(getConferenceByIDQuery), {
  options: () => ({
    variables: {
      // Will handle this issue later
      id: 1,
    },
  }),
})(ConferenceLocation);

ConferenceLocationWrapper.drawer = {
  primary: true,
};

ConferenceLocationWrapper.header = {
  theme: 'dark',
  statusBarBackgroundColor: Colors.primary,
};

ConferenceLocationWrapper.footer = {
  disable: true,
};

export default ConferenceLocationWrapper;
