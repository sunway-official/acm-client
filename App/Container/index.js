import React, { Component } from 'react';
import ApolloProvider from 'react-apollo/ApolloProvider';
import RootContainer from './Root';
import initStore from '../Redux';
import initApollo from '../Config/Apollo';

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
//     console.log(apolloClient.reducer());
//     const store = await initStore(apolloClient);
//     console.log(store);
//     this.setState({
//       apolloClient,
//       store,
//     });
//   }

//   render() {
//     const { apolloClient, store } = this.state;
//     console.log('render');
//     if (apolloClient && store) {
//       console.log(apolloClient, store);
//       return (
//         <ApolloProvider client={apolloClient} store={store}>
//           <RootContainer />
//         </ApolloProvider>
//       );
//     }
//     return null;
//   }
// }

import { Provider } from 'react-redux';
class App extends Component {
  render() {
    return (
      <Provider store={initStore()}>
        <RootContainer />
      </Provider>
    );
  }
}

export default App;
