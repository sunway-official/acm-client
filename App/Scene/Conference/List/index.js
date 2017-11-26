import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { LoadingIndicator } from '~/Component';
import { gql, compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import GET_ALL_CONFERENCES from '~/Graphql/query/getAllConferences.graphql';
import QUERY_ME from '~/Graphql/query/me.graphql';
import Item from './Item';
import styles from './styles';

const NO_CONFERENCE_VALUE = null;
class ConferenceList extends PureComponent {
  static propTypes = {
    queryConferences: PropTypes.objectOf(PropTypes.any),
    queryMe: PropTypes.objectOf(PropTypes.any),
    setHeader: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      disableHeader: false,
    };
  }

  componentDidUpdate() {
    // Disable header if there is no current conference
    const { queryMe, setHeader } = this.props;
    if (queryMe && queryMe.me) {
      const currentConferenceId = queryMe.me.currentConference;
      let disable;
      if (currentConferenceId === NO_CONFERENCE_VALUE) {
        disable = true;
      } else {
        disable = false;
      }
      setHeader({ disable });
      this.setState({ disableHeader: disable });
    }
  }

  render() {
    const { getAllConferences, loading } = this.props.queryConferences;
    const conferences = getAllConferences;
    return (
      <View
        style={[
          styles.container,
          this.state.disableHeader ? styles.noHeader : null,
        ]}
      >
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

const mapDispatchToProps = dispatch => ({
  setHeader: options => dispatch(addHeaderOptions(options)),
});

const ConferenceListWrapper = compose(
  graphql(gql(QUERY_ME), {
    name: 'queryMe',
  }),
  graphql(gql(GET_ALL_CONFERENCES), {
    name: 'queryConferences',
  }),
  connect(undefined, mapDispatchToProps),
)(ConferenceList);

ConferenceListWrapper.drawer = {
  secondary: true,
  disableGestures: true,
};

ConferenceListWrapper.header = {
  theme: 'dark',
  leftIcon: 'back',
};

ConferenceListWrapper.footer = {
  disable: true,
};

export default ConferenceListWrapper;
