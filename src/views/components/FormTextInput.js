// @flow
import React from 'react';
import { TextInput } from 'react-native';
import type { FieldProps } from 'redux-form';



const FormTextInput = ({ input: { onChange, ...inputProps }, ...props }: FieldProps) => (
  <TextInput
      onChangeText={onChange}
      {...inputProps}
      {...props}
  />
);


export default FormTextInput;
