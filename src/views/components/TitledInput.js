// @flow
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const TitledInput = ({ label, value, onChangeText, autoCorrect, placeholder, secureTextEntry }: TitledInputProps) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label.toUpperCase()}</Text>
      <TextInput
          value={value}
          placeholder={placeholder}
          autoCorrect={autoCorrect}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={styles.inputStyle}
      />
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
    height: 40
  }
});


export default TitledInput;


type TitledInputProps = {
  label: string;
  value: string;
  onChangeText: any;
  autoCorrect: boolean;
  placeholder: string;
  secureTextEntry: boolean;
};