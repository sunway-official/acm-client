import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator, EmptyCollection } from 'Component';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { compose, gql, graphql } from 'react-apollo';
import { NavigationActions } from 'Reduck/Navigation';
import GET_CURRENT_PAPER from 'Graphql/query/getCurrentPaper.graphql';

// import { PAPER } from './fixture';
import Item from './Item';
import styles from './styles';

class PapersTrackerScene extends Component {
  _renderPapersTrackerList() {
    return (
      <FlatList
        data={this.props.data.getCurrentPaper}
        renderItem={({ item, index }) => <Item key={index} {...item} />}
        keyExtractor={(item, index) => index}
      />
    );
  }

  _renderPapersTrackerContainer() {
    return (
      <View style={styles.container}>{this._renderPapersTrackerList()}</View>
    );
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.error) {
      return <EmptyCollection emptyText="You don't have any papers." />;
    }
    if (this.props.data.loading) {
      return this._renderLoading();
    }
    return this._renderPapersTrackerContainer();
  }
}

PapersTrackerScene.drawer = {
  primary: true,
};

PapersTrackerScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
};

PapersTrackerScene.propTypes = {
  data: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default compose(
  graphql(gql(GET_CURRENT_PAPER)),
  connect(undefined, mapDispatchToProps),
)(PapersTrackerScene);
