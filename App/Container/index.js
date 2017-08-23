import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RootContainer from './Root';
import { getStore } from '../Redux';
// create our store
const store = getStore();

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

export default App;