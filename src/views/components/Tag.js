import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const Tag = ({ name }) => {
  return (
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>{name}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  tagContainer: {
    marginRight: 3,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 6,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#CEF'
  },
  tagText: {
    marginLeft: 6,
    marginRight: 6,
    color: '#444',
    fontSize: 12
  }
});


export default Tag;
