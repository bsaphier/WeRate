import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Field } from 'redux-form';
import styles from '../styles/forms';



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
