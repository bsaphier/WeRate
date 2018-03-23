import React from 'react';
import { View, TextInput } from 'react-native';
import { Field } from 'redux-form';
import styles from '../styles/forms';
import colors from '../styles/colors';
import Txt from './Txt';



const _TextInput = ({ input: { onChange, ...inputProps }, ...props}) => (
  <TextInput
      style={styles.formTextInput}
      onChangeText={onChange}
      placeholderTextColor={colors.SHADE.LIGHTER}
      {...inputProps}
      {...props}
  />
);


const FormField = ({ label, ...props }) => (
  <View style={styles.inputContainerStyle}>
    <Txt style={styles.labelStyle}>{ label }</Txt>
    <Field
        component={_TextInput}
        {...props}
    />
  </View>
);


export default FormField;
