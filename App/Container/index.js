import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Font } from 'expo';
import fonts from '~/Asset/Font';
import RootContainer from './Root';
import initStore from '~/Redux';
import initApollo from '~/Config/Apollo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apolloClient: undefined,
    };
  }
  async componentDidMount() {
    const promises = await Promise.all([
      initApollo(),
      ...fonts.map(font => Font.loadAsync(font)),
    ]);

    this.setState({
      apolloClient: promises[0],
    });
  }

  render() {
    const { apolloClient } = this.state;
    if (apolloClient !== undefined) {
      return (
        <ApolloProvider client={apolloClient} store={initStore(apolloClient)}>
          <RootContainer />
        </ApolloProvider>
      );
    }
    return null;
  }
}

export default App;
