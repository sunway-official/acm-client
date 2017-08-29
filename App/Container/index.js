import React, { Component } from 'react';
import { Provider, createStore } from 'react-redux';
import ApolloProvider from 'react-apollo/ApolloProvider';
import RootContainer from './Root';
import { getStore } from '../Redux';
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
    const store = getStore(apolloClient);
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
