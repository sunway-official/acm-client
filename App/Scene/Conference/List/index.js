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
    this._renderSceneHeader();
  }

  componentWillUpdate(nextProps, nextState) {
    // Check when navigation back by comparing lastNavigationIndex
    const { sceneIndex } = this.props;
    if (
      nextProps.navigationIndex === sceneIndex &&
      nextState.lastNavigationIndex !== sceneIndex
    ) {
      console.log('navigated back');
      this._renderSceneHeader();
      this.setState({ lastNavigationIndex: nextProps.navigationIndex });
    }
    // console.log(nextProps.queryMe.me);
    console.log(nextProps.queryMe.me.id);
    console.log(nextProps.queryMe.me.id !== this.props.queryMe.me.id);
    if (
      nextProps.queryMe.me.id &&
      nextProps.queryMe.me.id !== this.props.queryMe.me.id
    ) {
      this._renderSceneHeader();
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
      } else {
        disable = false;
      }
      setHeader({ disable, statusBarBackgroundColor });
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
