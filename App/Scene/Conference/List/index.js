import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { graphql, gql } from 'react-apollo';
import { LoadingIndicator } from '~/Component';
import { Colors } from '~/Theme';
import GET_ALL_CONFERENCES from '~/Graphql/query/getAllConferences.graphql';
import Item from './Item';
import styles from './styles';

class ConferenceList extends PureComponent {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any),
  };
  render() {
    const { getAllConferences, loading } = this.props.data;
    const conferences = getAllConferences;
    return (
      <View style={styles.container}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <View>
            <FlatList
              data={conferences}
              renderItem={({ item }) => <Item {...item} />}
              keyExtractor={(item, index) => index}
            />
          </View>
        )}
      </View>
    );
  }
}

const ConferenceListWrapper = graphql(gql(GET_ALL_CONFERENCES), {})(
  ConferenceList,
);

ConferenceListWrapper.drawer = {
  secondary: true,
};

ConferenceListWrapper.header = {
  disable: true,
  theme: 'light',
};

ConferenceListWrapper.footer = {
  disable: true,
};

export default ConferenceListWrapper;
