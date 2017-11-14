// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Main from './src/views/Main';
import Store from './src/state/store';


export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={Store}>
        <Main />
      </Provider>
    );
  }
}
