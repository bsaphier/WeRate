// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Header = () => (
  <View style={styles.headerContainter}>
    <Text style={styles.header}>WeRate</Text>
  </View>
);


const styles = StyleSheet.create({
  headerContainter: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  header: {
    fontWeight: 'bold',
    marginTop: 34,
    marginBottom: 13,
    fontSize: 34,
    color: '#333'
  }
});


export default Header;
