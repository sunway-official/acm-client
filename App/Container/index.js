import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage } from 'react-native';
import RootContainer from './Root';
import initStore from '~/Redux';
import initApollo from '~/Config/Apollo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: undefined,
      refreshToken: undefined,
    };
  }
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    this.setState({
      token,
      refreshToken,
    });
  }

  render() {
    const { token, refreshToken } = this.state;
    if (token !== undefined && refreshToken !== undefined) {
      const apolloClient = initApollo({ token, refreshToken });
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
