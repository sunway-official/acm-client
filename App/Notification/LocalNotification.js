import { Component } from 'react';
import PropTypes from 'prop-types';
import { Permissions } from 'expo';
import { withApollo, gql } from 'react-apollo';
import setMyAgendaScheduleAsync from './handler/myAgenda';

import myAgendaQuery from '~/Graphql/query/getMyAgenda.graphql';
import myAgendaTransformer from '~/Scene/Schedule/MyAgenda/transformer';

/**
 * Must use React Component for using Apollo Client
 * render return null so there is no big affect to app performance
 */
class LocalNotification extends Component {
  async componentDidMount() {
    let permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (permission.status === 'granted') {
      /**
      * TO DO: Handle fetching my agenda schedule
      */
      const { client } = this.props;
      const { data: { getAllPersonalSchedules } } = await client.query({
        query: gql(myAgendaQuery),
      });
      // Apply schedule
      await setMyAgendaScheduleAsync(
        myAgendaTransformer(getAllPersonalSchedules, 'start', 'schedule'),
      );
    }
  }

  render() {
    return null;
  }
}

LocalNotification.propTypes = {
  client: PropTypes.object,
};

export default withApollo(LocalNotification);
