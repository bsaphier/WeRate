import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const PlaceForm = ({ handleSubmit }) => {
  return (
    <View style={styles.containerStyle}>
        <Text style={styles.labelStyle}>Place Form</Text>
        <Button title="submit" onPress={handleSubmit} />
    </View>
  );
};



const styles = StyleSheet.create({
  containerStyle: {
    height: 45,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
  },
  labelStyle: {
    fontSize: 12,
    color: '#7F7D7D',
    fontWeight: '200',
    flex: 1
  }
});


export default PlaceForm;
