import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage } from 'react-native';
import RootContainer from './Root';
import initStore from '../Redux';
import initApollo from '../Config/Apollo';

/**
 * old App with async await for apolloClient
 */

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       apolloClient: undefined,
//       store: undefined,
//     };
//   }

//   async componentDidMount() {
//     const apolloClient = await initApollo();
//     const store = initStore();
//     this.setState({
//       apolloClient,
//       store,
//     });
//   }

//   render() {
//     const { apolloClient, store } = this.state;
//     if (apolloClient && store) {
//       return (
//         <ApolloProvider client={apolloClient} store={store}>
//           <RootContainer />
//         </ApolloProvider>
//       );
//     }
//     return null;
//   }
// }

/**
 * new App without async await for apolloClient
 */

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
    console.log('Token: ', token, 'Refresh token:', refreshToken);
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
    console.log('No token');
    return null;
  }
}

export default App;
