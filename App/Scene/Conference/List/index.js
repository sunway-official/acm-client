import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { LoadingIndicator } from '~/Component';
import { gql, compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import { Colors } from '~/Theme';
import { KEY as NAVIGATION_KEY } from '~/Redux/Navigation';
import GET_ALL_CONFERENCES from '~/Graphql/query/getAllConferences.graphql';
import QUERY_ME from '~/Graphql/query/me.graphql';
import Item from './Item';
import styles from './styles';

const NO_CONFERENCE_VALUE = null;
class ConferenceList extends Component {
  static propTypes = {
    queryConferences: PropTypes.objectOf(PropTypes.any),
    queryMe: PropTypes.objectOf(PropTypes.any),
    setHeader: PropTypes.func,
    sceneIndex: PropTypes.number,
    navigationIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      disableHeader: false,
      lastNavigationIndex: 0,
    };

    this._renderSceneHeader = this._renderSceneHeader.bind(this);
  }

  componentWillReceiveProps({ navigationIndex }) {
    // Set lastNavigationIndex value when navigate to any scene
    const { sceneIndex } = this.props;
    if (navigationIndex !== sceneIndex) {
      this.setState({ lastNavigationIndex: navigationIndex });
    }
  }

  componentDidMount() {
    if (this.props.queryMe.me) {
      this._renderSceneHeader();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // Resolve an issue when on the first login
    // when there is no current conference & queryMe still in pending
    if (nextProps.queryMe.me) {
      // If the query me has changed
      if (nextProps.queryMe.me.id !== this.props.queryMe.me.id) {
        this._renderSceneHeader();
      } else {
        // Check when navigation back by comparing lastNavigationIndex
        const { sceneIndex } = this.props;
        if (
          nextProps.navigationIndex === sceneIndex &&
          nextState.lastNavigationIndex !== sceneIndex
        ) {
          this._renderSceneHeader();
          this.setState({ lastNavigationIndex: nextProps.navigationIndex });
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Prevent update when lastNavigationIndex or sceneIndex has changed
    if (nextState.lastNavigationIndex !== this.state.lastNavigationIndex) {
      return false;
    }
    if (nextProps.sceneIndex !== this.props.sceneIndex) {
      return false;
    }
    return true;
  }

  _renderSceneHeader() {
    // Disable header if there is no current conference
    const { queryMe, setHeader } = this.props;
    if (queryMe && queryMe.me) {
      const currentConferenceId = queryMe.me.currentConference;
      let disable, statusBarBackgroundColor;
      if (currentConferenceId === NO_CONFERENCE_VALUE) {
        disable = true;
        statusBarBackgroundColor = 'rgba(0,0,0,0.075)';
      } else {
        disable = false;
        statusBarBackgroundColor = Colors.primary;
      }
      setHeader({ disable, statusBarBackgroundColor });
      this.setState({ disableHeader: disable });
    }
  }

  render() {
    const { getAllConferencesByUserID, loading } = this.props.queryConferences;
    const conferences = getAllConferencesByUserID;
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
              renderItem={({ item: { conference } }) => (
                <Item {...conference} />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  // Find newsfeed scene index in navigation stack
  let sceneIndex = 0;
  state[NAVIGATION_KEY].routes.map(({ routeName }, index) => {
    if (routeName === 'newsFeed') {
      sceneIndex = index;
    }
  });
  return {
    sceneIndex,
    navigationIndex: state[NAVIGATION_KEY].index,
  };
};

const mapDispatchToProps = dispatch => ({
  setHeader: options =>
    setTimeout(() => {
      dispatch(addHeaderOptions(options));
    }),
});

const ConferenceListWrapper = compose(
  graphql(gql(QUERY_ME), {
    name: 'queryMe',
  }),
  graphql(gql(GET_ALL_CONFERENCES), {
    name: 'queryConferences',
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(ConferenceList);

ConferenceListWrapper.drawer = {
  secondary: true,
  disableGestures: true,
};

ConferenceListWrapper.header = {
  theme: 'dark',
  statusBarBackgroundColor: Colors.primary,
};

ConferenceListWrapper.footer = {
  disable: true,
};

export default ConferenceListWrapper;
