import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from 'Theme';
import { LoadingIndicator } from 'Component';
import { reset } from 'Reduck/Navigation/action';
import { KEY as NAVIGATION_KEY } from 'Reduck/Navigation';
import { graphql, gql, compose } from 'react-apollo';
import query from 'Graphql/query/getMyAgenda.graphql';
import transformer from 'Transformer/schedules/myAgenda';
import List from './List';
import styles from './styles';

class MyAgenda extends Component {
  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      lastNavigationIndex: 0,
    };
  }

  async componentWillMount() {
    const { data: { refetch } } = this.props;
    await refetch();
  }

  componentWillReceiveProps({ navigationIndex }) {
    if (navigationIndex !== this.props.sceneIndex) {
      this.setState({
        lastNavigationIndex: navigationIndex,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.lastNavigationIndex !== this.state.lastNavigationIndex) {
      return false;
    }
    if (nextProps.sceneIndex !== this.props.sceneIndex) {
      return false;
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    const { sceneIndex, data: { refetch } } = this.props;
    if (
      nextState.lastNavigationIndex !== sceneIndex &&
      nextProps.navigationIndex === sceneIndex
    ) {
      refetch();
      this.setState({ lastNavigationIndex: nextProps.navigationIndex });
    }
  }

  render() {
    const { data: { loading, getAllPersonalSchedules } } = this.props;
    return loading ? (
      this._renderLoading()
    ) : (
      <View style={styles.container}>
        <List schedules={transformer(getAllPersonalSchedules, 'start')} />
      </View>
    );
  }
}

MyAgenda.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    getAllPersonalSchedules: PropTypes.array,
    refetch: PropTypes.func,
  }),
  sceneIndex: PropTypes.number,
  navigationIndex: PropTypes.number,
};

MyAgenda.header = {
  theme: 'dark',
  statusBarBackgroundColor: Colors.primary,
  actions: [
    {
      icon: {
        name: 'calendar-range',
        type: 'material-community',
      },
      onPress: dispatch => dispatch(reset({ routeName: 'agenda' })),
    },
  ],
};

MyAgenda.footer = {
  show: true,
  activeColor: Colors.primary,
};

MyAgenda.drawer = {
  primary: true,
};

const mapStateToProps = state => {
  let sceneIndex = 0;
  state[NAVIGATION_KEY].routes.map(({ routeName }, index) => {
    if (routeName === 'agenda') {
      sceneIndex = index;
    }
  });
  return {
    sceneIndex,
    navigationIndex: state[NAVIGATION_KEY].index,
  };
};

export default compose(
  graphql(gql(query), {
    options: {
      notifyOnNetworkStatusChange: true,
    },
  }),
  connect(mapStateToProps, undefined),
)(MyAgenda);
