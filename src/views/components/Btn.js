import React from 'react';
import { Button, StyleSheet } from 'react-native';



const Btn = ({ title, onPress }) => {
  return (
    <Button title={title} onPress={onPress} />
  );
};


const styles = StyleSheet.create({
});


export default Btn;
