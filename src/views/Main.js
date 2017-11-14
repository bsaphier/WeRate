
// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Sketch, Header } from './components';


export default class Main extends Component<{}> {
  render() {
    return (
      <View>
        <Header />
        <Sketch />
      </View>
    );
  }
}