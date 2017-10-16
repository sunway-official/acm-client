import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusInput } from '~/Component';

import { graphql, gql, compose } from 'react-apollo';
import INSERT_NEWS_MUTATION from '~/Graphql/mutation/insertNews.graphql';

class StatusPosting extends Component {
  static propTypes = {
    insertNews: PropTypes.func,
  };

  post(contentNews) {
    if (contentNews) {
      this.props.insertNews({
        userId: 11, // bk user id
        conferenceId: 1, // fake conferences
        contentNews,
      });
    } else {
      console.log('input please girl!');
    }
  }

  render() {
    return <StatusInput post={this.post} />;
  }
}

const StatusPostingMutation = graphql(gql(INSERT_NEWS_MUTATION), {
  props: ({ mutate }) => ({
    insertNews: ({ userId, conferenceId, contentNews }) =>
      mutate({
        variables: { userId, conferenceId, contentNews },
      }),
  }),
});

export default compose(StatusPostingMutation)(StatusPosting);
