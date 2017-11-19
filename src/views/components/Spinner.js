// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Spinner = () => (
  <View style={styles.spinnerContainter}>
    <Text style={styles.spinner}>LOADING</Text>
  </View>
);


const styles = StyleSheet.create({
  spinnerContainter: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  spinner: {
    fontWeight: 'bold',
    marginTop: 34,
    marginBottom: 13,
    fontSize: 55,
    color: '#444'
  }
});


export default Spinner;
