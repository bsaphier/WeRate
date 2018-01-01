// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const LabeledValue = ({ label, value }: LabeledValueProps) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label.toUpperCase()}</Text>
      <Text style={styles.inputStyle}>{value}</Text>
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
  },
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#262626',
    fontSize: 18,
    fontWeight: '200',
    flex: 1,
    height: 40,
    width: '100%'
  }
});


export default LabeledValue;


type LabeledValueProps = {
  label: string;
  value: string;
};