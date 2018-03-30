import React from 'react';
import { View } from 'react-native';
import { Field } from 'redux-form';
import FormFieldTextInput from './FormFieldTextInput';
import styles from '../styles/forms';
import Txt from './Txt';



const FormField = ({ label, ...props }) => (
  <View style={styles.inputContainerStyle}>
    <Txt style={styles.labelStyle}>{ label }</Txt>
    <Field component={FormFieldTextInput} {...props} />
  </View>
);


export default FormField;
