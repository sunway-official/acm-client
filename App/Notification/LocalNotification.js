import { Component } from 'react';
import { withApollo } from 'react-apollo';
import setMyAgendaScheduleAsync from './handler/myAgenda';
import fixtures from './fixtures';

/**
 * Must use React Component for using Apollo Client
 * render return null so there is no big affect to app performance
 */
class LocalNotification extends Component {
  async componentDidMount() {
    /**
     * TO DO: Handle fetching my agenda schedule
     */
    await setMyAgendaScheduleAsync(fixtures);
  }

  render() {
    return null;
  }
}

LocalNotification.propTypes = {};

export default withApollo(LocalNotification);
