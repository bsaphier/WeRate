import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Field } from 'redux-form';



const _TextInput = ({ input: { onChange, ...inputProps }, ...props}) => (
  <TextInput
      style={styles.inputStyle}
      onChangeText={onChange}
      {...inputProps}
      {...props}
  />
);


const FormField = ({ label, ...props }) => (
  <View style={styles.inputContainerStyle}>
    <Text style={styles.labelStyle}>{ label }</Text>
    <Field
        component={_TextInput}
        {...props}
    />
  </View>
);


export default FormField;


const styles = StyleSheet.create({
  inputContainerStyle: {
    height: 45,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    borderColor: '#D4D4D4',
    borderBottomWidth: 1
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
