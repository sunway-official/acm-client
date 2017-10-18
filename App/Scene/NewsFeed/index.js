import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';

import styles from './styles';
import { Colors } from '~/Theme';
import { News } from '~/Component';
import NewsFeedPosting from './NewsFeedPosting';
import { AnimatableView } from '~/Component';

import query from '~/Graphql/query/getAllNews.graphql';

class NewsFeedScene extends Component {
  render() {
    const { loading, allNews } = this.props;
    // console.log(allNews);

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AnimatableView
            animation="rotate"
            duration={1000}
            iterationCount="infinite"
          >
            <Icon name="loop" />
          </AnimatableView>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <NewsFeedPosting />
        {allNews.map((item, index) => <News item={item} key={index} />)}
      </ScrollView>
    );
  }
}

NewsFeedScene.propTypes = {
  home: PropTypes.func,
  setTitle: PropTypes.func,
  toggleHeader: PropTypes.func,
  toggleFooter: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  allNews: PropTypes.array,
  refetch: PropTypes.func,
  error: PropTypes.object,
};

NewsFeedScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

NewsFeedScene.footer = {
  show: true,
  activeColor: Colors.primary,
};

const NewsFeedSceneWithData = graphql(gql(query), {
  props: ({ data: { loading, getAllNews, refetch, error } }) => ({
    loading,
    allNews: getAllNews,
    refetch,
    error,
  }),
})(NewsFeedScene);

export default NewsFeedSceneWithData;
