import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Sketch } from './components';



class HomeTab extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Sketch />
      </View>
    );
  }
}


export default connect()(HomeTab);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
