import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';
import { MapView } from 'expo';

import { graphql, gql } from 'react-apollo';

import getConferenceByIDQuery from '~/Graphql/query/getConferenceById.graphql';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

class AppMaps extends PureComponent {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any),
  };
  render() {
    const { getConferenceByID, loading } = this.props.data;
    return (
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
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

const AppMapsWithQuery = graphql(gql(getConferenceByIDQuery), {
  options: () => ({ variables: { id: 1 } }),
})(AppMaps);

AppMapsWithQuery.drawer = {
  primary: true,
};

export default AppMapsWithQuery;
