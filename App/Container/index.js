import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import RootContainer from './Root';
import initStore from '../Redux';
import initApollo from '../Config/Apollo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apolloClient: undefined,
      store: undefined,
    };
  }

  async componentDidMount() {
    const apolloClient = await initApollo();
    const store = initStore();
    this.setState({
      apolloClient,
      store,
    });
  }

  render() {
    const { apolloClient, store } = this.state;
    if (apolloClient && store) {
      return (
        <ApolloProvider client={apolloClient} store={store}>
          <RootContainer />
        </ApolloProvider>
      );
    }
    return null;
  }
}

export default App;
