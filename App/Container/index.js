import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage } from 'react-native';
import { Font } from 'expo';
import fonts from '~/Asset/Font';
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
    const tokens = await Promise.all([
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('refreshToken'),
      ...fonts.map(font => Font.loadAsync(font)),
    ]);

    const token = tokens[0];
    const refreshToken = tokens[1];

    this.setState({
      token,
      refreshToken,
    });
  }

  render() {
    const { token, refreshToken } = this.state;
    if (token !== undefined && refreshToken !== undefined) {
      console.log(this.state);
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
