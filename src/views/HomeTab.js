import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';



class HomeTab extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          HOME
        </Text>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
