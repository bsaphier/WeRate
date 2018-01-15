// @flow
import React from 'react';
import { Slider } from 'react-native';
import type { FieldProps } from 'redux-form';



const FormSlider = ({ input: { onChange, ...inputProps }, ...props }: FieldProps) => (
  <Slider
      onValueChange={onChange}
      {...inputProps}
      {...props}
  />
);


export default FormSlider;
