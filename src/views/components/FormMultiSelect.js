// @flow
import React from 'react';
import type { FieldProps } from 'redux-form';
import MultiSelect from './MultiSelect';



const FormMultiSelect = ({ input: { value, onChange, ...inputProps }, ...props }: FieldProps) => (
  <MultiSelect
      onValueChange={onChange}
      selectedItemIds={value}
      {...inputProps}
      {...props}
  />
);


export default FormMultiSelect;
