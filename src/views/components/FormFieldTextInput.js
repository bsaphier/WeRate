import React from 'react';
import { TextInput } from 'react-native';
import styles from '../styles/forms';
import colors from '../styles/colors';


const FormFieldTextInput = ({ input: { onChange, ...inputProps }, ...props }) => (
  <TextInput
      style={styles.formTextInput}
      onChangeText={onChange}
      placeholderTextColor={colors.SHADE.LIGHTER}
      {...inputProps}
      {...props}
  />
);

export default FormFieldTextInput;
